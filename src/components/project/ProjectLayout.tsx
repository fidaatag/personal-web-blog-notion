import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Container } from '../Container';
import { Prose } from '../Prose';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';

interface Props {
  children: React.ReactNode;
  meta: {
    title: string;
    description: string;
    date: string;
    code: string;
    codePlatform: string;
    preview: string;
    techStack: string[];
    member: string;
    role: string;
    from: string;
  };
  previousPathname?: string;
}

export const ProjectLayout = ({ children, meta, previousPathname }: Props) => {
  let router = useRouter();

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-3xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-primary" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {meta.title}
              </h1>
              <data className="border-l px-4 py-2 ml-1 mt-4 text-sm text-zinc-400 dark:text-zinc-500 w-fit">
                <table className="table-auto">
                  <tbody>
                    <tr>
                      <td>Type</td>
                      <td className="pl-3">: {meta.member}</td>
                    </tr>
                    <tr>
                      <td>Role</td>
                      <td className="pl-3">: {meta.role}</td>
                    </tr>
                    <tr>
                      <td>From</td>
                      <td className="pl-3">: {meta.from}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table-auto">
                  <tbody>
                    <tr>
                      <td>Tech</td>
                      <td className="pl-3">: {meta.techStack.join(', ')}</td>
                    </tr>
                    <tr>
                      <td>Code</td>
                      <td className="pl-3 truncate"><a href={`${meta.code}`}>: {meta.codePlatform}</a></td>
                    </tr>
                    <tr>
                      <td>Live</td>
                      <td className="pl-3"><a href={`${meta.preview}`}>: {new URL(meta.preview).hostname}</a></td>
                    </tr>
                  </tbody>
                </table>
              </data>
            </header>
            <Prose className="mt-8">{children}</Prose>
          </article>
        </div>
      </div>
    </Container>
  );
};
