import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';

import AvatarImage from '../../public/assets/blog/authors/foto_fidaa.jpg';
import { Container } from '../components/Container';
import { ExternalLink } from '../components/ExternalLink';
import { PageTitle } from '../components/PageTitle';
import { Section } from '../components/Section';
import { SocialLink } from '../components/SocialLink';
import {
  AboutExtended,
  Books,
  SocialMedia,
} from '../data/lifeApi';
import { testUtil } from '../lib/testUtil';

const seoTitle = `About`;
const seoDescription = `A few words about me.`;

export default function AboutMe() {

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/about`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${seoTitle}&description=${seoDescription}`,
            },
          ],
        }}
      />
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={AvatarImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <PageTitle>Hi, I&apos;m Fidaa Mustaghfiroh.</PageTitle>
            <div className="mt-6 text-base">{AboutExtended}</div>
            <div className="mt-6 flex gap-6">
              {SocialMedia.map((socialProfile) => (
                <SocialLink
                  key={socialProfile.name}
                  aria-label={`Follow on ${socialProfile.name}`}
                  href={socialProfile.link}
                  icon={socialProfile.icon}
                />
              ))}
            </div>

            <Section>
              <Section.Title as="h2">Work</Section.Title>
              <Section.Content>
                Now I am an Sudut Kota Lama photographer who focuses on street photos 
                and photos of traditional Javanese attire. At the same time, 
                I got a full stack web scholarship from markoding. And because of that,....
                <br/>
                <br/>
                I have decided to transition into the role of a Frontend Developer.
                In my previous position, I served as an editor for a WordPress-based website
                where I was responsible for generating specific content and crafting pages.
                My experience encompasses proficiency in JavaScript and PHP programming languages,
                as well as the utilization of WooCommerce, design principles, and photography skills.
                Furthermore, I possess expertise in SEO strategies and proficiency with tools
                including Google Analytics, SEMrush, Ahrefs, and Meta ad library.
              </Section.Content>
            </Section>
            <Section>
              <Section.Title as="h2">Books worth re-reading</Section.Title>
              <Section.Content>
                <ul className="mt-1 list-disc list-inside">
                  {Books.map((book) => (
                    <li key={book.name}>
                      <ExternalLink href={book.link}>{book.name}</ExternalLink>
                    </li>
                  ))}
                </ul>
              </Section.Content>
            </Section>
          </div>
        </div>
      </Container>
    </>
  );
}
