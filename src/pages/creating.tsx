import { motion, useMotionValue } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { MouseEvent } from 'react';

import { PageLayout } from '../components/PageLayout';
import { ProjectCard } from '../components/ProjectCard';
import { MyCurrentProjects, MyPastProjects } from '../data/lifeApi';
import { ANIMATION_FROM_PROPS, ANIMATION_TO_PROPS } from '../lib/animation';

const seoTitle = 'Creating';
const seoDescription = "My experiment in assembling code blocks";

export default function Creating() {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/creating`}
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
          className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MyCurrentProjects.map((project) => (
            <motion.li
              key={project.title}
              initial={ANIMATION_FROM_PROPS}
              whileInView={ANIMATION_TO_PROPS}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </ul>

        <h2 className="mt-24 text-2xl font-bold tracking-tight">Past</h2>
        <p className="mt-2 text-base">
          Projects I have worked on
        </p>
        <hr />
        <ul
          role="list"
          className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MyPastProjects.map((project) => (
            <motion.li
              key={project.title}
              initial={ANIMATION_FROM_PROPS}
              whileInView={ANIMATION_TO_PROPS}
              viewport={{ once: true }}
            >
              <ProjectCard key={project.title} project={project} />
            </motion.li>
          ))}
        </ul>
      </PageLayout>
    </>
  );
}
