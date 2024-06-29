import { GetStaticPaths, GetStaticProps } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { NoteLayout } from 'src/components/notes/NoteLayout';
import { NotionBlockRenderer } from 'src/components/notion/NotionBlockRenderer';
import { ProjectLayout } from 'src/components/project/ProjectLayout';

import { Proj as ProjectType, projectApi } from 'src/lib/projectApi';

type Props = {
  project: ProjectType;
  projectContent: any[];
};

const Project = ({
  project : { title, description, createdAt, slug, code, codePlatform, preview, techStack, member, role, from },
  projectContent,
  previousPathname,
}: Props & { previousPathname: string }) => {

  const url = `${process.env.NEXT_PUBLIC_URL}/projects/${slug}`;
  const openGraphImageUrl = `${process.env.NEXT_PUBLIC_URL}/api/og?title=${title}&description=${description}`;


  useEffect(() => {
    Prism.highlightAll();
  }, [])


  return (
    <>

      <NextSeo 
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          images: [{ url: openGraphImageUrl }]
        }}
      />

      <ArticleJsonLd
        url={url}
        images={[openGraphImageUrl]}
        title={title}
        datePublished={createdAt}
        authorName="Fidaa Mustaghfiroh"
        description={description}
      />

      <ProjectLayout 
        meta={{ title, description, date: createdAt, code, codePlatform, preview, techStack, member, role, from }}
        previousPathname={previousPathname}
      >
        <div className="pb-32">
          {projectContent.map((block) => (
            <NotionBlockRenderer key={block.id} block={block} />
          ))}

          <hr />

        </div>
      </ProjectLayout>
    
    </>
  )
}

export default Project;


export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (context) => {
  const slug = context.params?.slug;
  const allProject = await projectApi.getAllProject();
  const project = allProject.find((project) => project.slug === slug);

  if (!project) {
    return {
      notFound: true,
    };
  };

  const projectContent = await projectApi.getProject(project.id);

  return {
    props: {
      project,
      projectContent,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await projectApi.getAllProject();

  return {
    paths: posts.map((post) => ({ params: {slug: post.slug} })),
    fallback: 'blocking'
  }
}