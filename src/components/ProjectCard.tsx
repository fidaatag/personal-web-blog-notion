import Image from 'next/image';

import { Badge } from './Badge';
import { Card } from './Card';
import { Proj } from 'src/lib/projectApi';

interface Props {
  project: Proj;
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <Card className="h-full" key={project.title}>
      <div className="relative z-10 flex h-16 w-16 p-2 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={`${project.logo}`}
          alt={`Logo of ${project.title}`}
          className="h-10 w-10 object-contain p-1"
          width={0}
          height={0}
          unoptimized
        />
      </div>
      <div className="mt-6">
        {project.slug ? (
          <Card.Title href={`/projects/${project.slug}`}>{project.title}</Card.Title>
        ) : (
          <Card.Title>{project.title}</Card.Title>
        )}
      </div>
      <Card.Description>{project.description}</Card.Description>
      <p className="mt-6 font-mono flex flex-wrap gap-1 z-10 mb-6">
        {project.techStack.map((techStackItem) => (
          <Badge key={techStackItem}>{techStackItem}</Badge>
        ))}
      </p>
      <div className="relative z-10 mt-auto flex text-sm font-medium text-zinc-400 transition group-hover:text-primary dark:text-zinc-200">
        <Card.Cta href={`/projects/${project.slug}`}>View Project</Card.Cta>
      </div>
    </Card>
  );
};