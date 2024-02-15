import { NextSeo } from 'next-seo';

import { PageLayout } from '../components/PageLayout';
import { Tool } from '../components/tools/Tool';
import { ToolsSection } from '../components/tools/ToolsSection';
import { Tools } from '../data/lifeApi';

const seoTitle = 'Uses';
const seoDescription = 'Software I use, gadgets I love, and other things I recommend.';

export default function Uses() {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/uses`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${seoTitle}&description=${seoDescription}`,
            },
          ],
        }}
      />
      <PageLayout
        title="The software I use and the gadgets I have."
        intro="Use items until they really can't be used anymore."
      >
        <div className="space-y-20">
          {Object.entries(Tools).map(([title, tools]) => (
            <ToolsSection key={title} title={title}>
              {tools.map((tool) => (
                <Tool key={tool.title} title={tool.title} href={tool.href}>
                  {tool.description}
                </Tool>
              ))}
            </ToolsSection>
          ))}
        </div>
      </PageLayout>
    </>
  );
}
