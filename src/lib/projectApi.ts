// @ts-nocheck
import { Client, isFullPage } from '@notionhq/client';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { compareAsc, compareDesc } from 'date-fns';
import { pages } from 'next/dist/build/templates/app-page';
import { getPlaiceholder } from 'plaiceholder';

const notion = new Client({
  auth: process.env.NOTION_TOKEN_PROJECT,
});

export type Proj = {
  id: string;
  createdAt: string;
  lastEditedAt: string;
  coverImage: string | null;
  logo: string | null;
  title: string;
  description: string;
  slug: string;
  code: string;
  codePlatform: string;
  preview: string;
  techStack: string[];
  type: string;
  published: boolean;
  member: string;
  role: string;
  from: string;
};

const noop = async (block: BlockObjectResponse) => block;

type BlockType = BlockObjectResponse['type'];

const BlockTypeTransformLookup: Record<
  BlockType,
  (block: BlockObjectResponse) => Promise<BlockObjectResponse>
> = {
  file: noop,
  paragraph: noop,
  heading_1: noop,
  heading_2: noop,
  heading_3: noop,
  bulleted_list_item: noop,
  numbered_list_item: noop,
  quote: noop,
  to_do: noop,
  toggle: noop,
  template: noop,
  synced_block: noop,
  child_page: noop,
  child_database: noop,
  equation: noop,
  code: noop,
  callout: noop,
  divider: noop,
  breadcrumb: noop,
  table_of_contents: noop,
  column_list: noop,
  column: noop,
  link_to_page: noop,
  table: noop,
  table_row: noop,
  embed: noop,
  bookmark: noop,
  image: async (block: any) => {
    const contents = block[block.type];
    const buffer = await fetch(contents[contents.type].url).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );
    const {
      base64,
      metadata: { height, width },
    } = await getPlaiceholder(buffer, { size: 64 });
    block.image['size'] = { height, width };
    block.image['placeholder'] = base64;

    return block;
  },
  video: noop,
  pdf: noop,
  audio: noop,
  link_preview: noop,
  unsupported: noop,
};


class ProjectApi {
  constructor(
    private readonly notion: Client,
    private readonly databaseId: string,
  ) {}

  async getAllProject() {
    const project = await this.getDatabaseContent(this.databaseId);
    return project;
  }

  async getProjectByTag(tag: string) {
    const AllProject = await projectApi.getAllProject();
    const relatedProject = AllProject.filter((project) => project.techStack.includes(tag));
    return relatedProject;
  }

  async getProject(id: string) {
    return this.getPageContent(id);
  }

  private getDatabaseContent = async (databaseId: string): Promise<Proj[]> => {
    const db = await this.notion.databases.query({ database_id: databaseId });

    while (db.has_more && db.next_cursor) {
      const { results, has_more, next_cursor } = await this.notion.databases.query({
        database_id: databaseId,
        start_cursor: db.next_cursor,
      });
      db.results = [...db.results, ...results];
      db.has_more = has_more;
      db.next_cursor = next_cursor;
    }

    return db.results
      .map((page) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        return {
          id: page.id,
          createdAt: page.created_time,
          lastEditedAt: page.last_edited_time,
          coverImage: page.cover?.type === 'external' ? page.cover.external.url : null,
          logo: 'files' in page.properties.logo ? page.properties.logo.files[0]?.file.url : null,
          title: 'title' in page.properties.title ? page.properties.title.title[0]?.plain_text : '',
          description: 'rich_text' in page.properties.description ? page.properties.description.rich_text[0]?.plain_text : '',
          slug: 'formula' in page.properties.slug ? page.properties.slug.formula.string : '',
          code: 'rich_text' in page.properties.code ? page.properties.code.rich_text[0]?.plain_text : '',
          codePlatform: 'select' in page.properties.codePlatform ? page.properties.codePlatform.select?.name : '',
          preview: 'rich_text' in page.properties.preview ? page.properties.preview.rich_text[0]?.plain_text : '',
          techStack: 'multi_select' in page.properties.techStack ? page.properties.techStack.multi_select.map((tag) => tag.name) : [],
          type: 'select' in page.properties.type ? page.properties.type.select?.name : '',
          published: 'checkbox' in page.properties.published ? page.properties.published.checkbox : false,
          member: 'select' in page.properties.member ? page.properties.member.select?.name : '',
          role: 'select' in page.properties.role ? page.properties.role.select?.name : '',
          from: 'rich_text' in page.properties.from ? page.properties.from.rich_text[0]?.plain_text : '',
        };
      })
      .filter((post) => post.published);
  };

  private getPageContent = async (pageId: string) => {
    const blocks = await this.getBlocks(pageId);

    const blocksChildren = await Promise.all(
      blocks.map(async (block) => {
        const { id } = block;
        const contents = block[block.type as keyof typeof block] as any;
        if (!['unsupported', 'child_page'].includes(block.type) && block.has_children) {
          contents.children = await this.getBlocks(id);
        }

        return block;
      }),
    );

    return Promise.all(
      blocksChildren.map(async (block) => {
        return BlockTypeTransformLookup[block.type as BlockType](block);
      }),
    ).then((blocks) => {
      return blocks.reduce((acc: any, curr) => {
        if (curr.type === 'bulleted_list_item') {
          if (acc[acc.length - 1]?.type === 'bulleted_list') {
            acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
          } else {
            acc.push({
              type: 'bulleted_list',
              bulleted_list: { children: [curr] },
            });
          }
        } else if (curr.type === 'numbered_list_item') {
          if (acc[acc.length - 1]?.type === 'numbered_list') {
            acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
          } else {
            acc.push({
              type: 'numbered_list',
              numbered_list: { children: [curr] },
            });
          }
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
    });
  };

  private getBlocks = async (blockId: string) => {
    const list = await this.notion.blocks.children.list({
      block_id: blockId,
    });

    while (list.has_more && list.next_cursor) {
      const { results, has_more, next_cursor } = await this.notion.blocks.children.list({
        block_id: blockId,
        start_cursor: list.next_cursor,
      });
      list.results = list.results.concat(results);
      list.has_more = has_more;
      list.next_cursor = next_cursor;
    }

    return list.results as BlockObjectResponse[];
  };
}

export const projectApi = new ProjectApi(notion, process.env.NOTION_DATABASE_ID_PROJECT!);
