import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo'
import { PageLayout } from 'src/components/PageLayout';
import { ProjectCard } from 'src/components/ProjectCard';
import { MyCurrentProjects, MyPastProjects } from 'src/data/lifeApi';
import { ANIMATION_FROM_PROPS, ANIMATION_TO_PROPS } from 'src/lib/animation';
import { Proj, projectApi } from 'src/lib/projectApi';


const seoTitle = 'Project';
const seoDescription = 'My experiment in assembling code blocks';

interface Props {
  projects: Proj[];
}

export default function Projects({ projects }: Props) {

  return (
    <>
      <NextSeo 
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/project`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${seoTitle}&description=${seoDescription}`,
            },
          ],
        }}
      />
      <PageLayout
        title="Things that make me feel at home putting together blocks of code."
        intro="A list of projects I've worked on, I'm working on and I will work on."
      >
        <h2 className="text-2xl font-bold tracking-tight">Now</h2>
        <p className="mt-2 text-base">Projects I currently work on.</p>
        <hr />
        <ul
          role="list"
          className="grid grid-cols-1 mt-12 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.li
              key={project.title}
              initial={ANIMATION_FROM_PROPS}
              whileInView={ANIMATION_TO_PROPS}
              viewport={{ once: true }}
              whileHover={{ scale: 1.2 }}
            >
              <ProjectCard project={project}/>
            </motion.li>
          ))}
        </ul>
      </PageLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = await projectApi.getAllProject();

  return {
    props: {
      projects,
    },
    revalidate: 10,
  }
}