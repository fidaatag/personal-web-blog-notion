import { GitHubIcon } from '../components/icons/GitHubIcon';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { XIcon } from '../components/icons/XIcon';
import BmiCheckLogo from '../images/logos/bmicheck.png';
import DicodingLogo from '../images/logos/dicoding.jpeg';
import DipiLogo from '../images/logos/dipi.png';
import RealJobPortal from '../images/logos/realjobportal.png';
import RestalyLogo from '../images/logos/restaly.png';
import SanbercodeLogo from '../images/logos/sanbercode.png';
import SendokIbuLogo from '../images/logos/sendokibu.jpeg';
import SkilvulLogo from '../images/logos/skilvul.png';
import SudutKotaLamaLogo from '../images/logos/sudutkotalama.jpg';
import TodoAppLogo from '../images/logos/todoapp.svg';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';

export const Name = 'Fidaa Mustaghfiroh';

export const About = (
  <>
    {`I love challenges, because life without them would feel bland. Every day I spend creating new things that are unique and creative. Because of that, I like coding and photography, two worlds that both keep me challenged to create new things.`}{' '}
  </>
);
export const AboutExtended = `I live in Semarang, Central Java, a city on the north coast of Java Island. I am a graduate of Islamic da'wah communications. Since I was at the Kudus Islamic boarding school, I have liked website programming. In the past, I only thought of it as entertainment during computer access time. But now, it's not only entertainment but also makes me addicted to learning many things about programming other than websites.`;

export type Project = {
  title: string;
  techStack: string[];
  description: string;
  logo: any;
  link?: {
    label: string;
    href: string;
  };
};

export const MyCurrentProjects: Project[] = [
  {
    title: 'DIPI',
    techStack: ['react', 'redux', 'tailwind', 'express', 'mysql'],
    description: 'A platform to help innovators find support.',
    logo: DipiLogo,
    link: {
      label: 'dipi client',
      href: 'dipi-client.vercel.app',
    },
  },
];

export const MyPastProjects: Project[] = [
  {
    title: 'Real Job Portal',
    techStack: ['react', 'tailwind', 'use-context'],
    description: 'A website listing job vacancies.',
    logo: RealJobPortal,
    link: {
      label: 'Real Job Portal',
      href: 'https://sanbercode-reactjs-batch-44.vercel.app/',
    },
  },
  {
    title: 'BMI Check',
    techStack: ['html', 'css', 'javascript'],
    description: 'A website to calculate your BMI type.',
    logo: BmiCheckLogo,
    link: {
      label: 'BMI check',
      href: 'https://bmi-checkk.netlify.app',
    },
  },
  {
    title: 'Restaly',
    techStack: ['javascript', 'PWA', 'e2e testing', 'webpack'],
    description: 'A website catalog italian restaurant.',
    logo: RestalyLogo,
    link: {
      label: 'Restaly',
      href: 'https://restaly.netlify.app',
    },
  },
  {
    title: 'Todo App',
    techStack: ['react', 'redux', 'jest-testing'],
    description: 'A simple website todo app.',
    logo: TodoAppLogo,
    link: {
      label: 'Git Hub',
      href: 'https://github.com/fidaatag/butkem-skilvul-task-TPA5-todo-app/tree/testing',
    },
  },
];

export const SocialMedia = [
  { name: 'Twitter', link: 'https://twitter.com/fidaatag', icon: XIcon },
  { name: 'Instagram', link: 'https://www.instagram.com/fidaatag/', icon: InstagramIcon },
  { name: 'Github', link: 'https://github.com/fidaatag', icon: GitHubIcon },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/fidaatag', icon: LinkedInIcon },
] as const;

export const Work = [
  {
    company: 'Sudut Kota Lama',
    title: 'Fotografer',
    logo: SudutKotaLamaLogo,
    start: '2022',
    end: 'now',
  },
  {
    company: 'Sendokibu',
    title: 'Copywriter',
    logo: SendokIbuLogo,
    start: '2021',
    end: '2022',
  },
] as const;

export const Course = [
  {
    company: 'Skilvul',
    title: 'Full Stack Web Development',
    logo: SkilvulLogo,
    month: "October'23 - February",
    year: '2024',
  },
  {
    company: 'Skilvul',
    title: 'Web Development',
    logo: SkilvulLogo,
    month: 'June - September',
    year: '2023',
  },
  {
    company: 'Sanbercode',
    title: 'React Js Web Frontend',
    logo: SanbercodeLogo,
    month: 'April - May',
    year: '2023',
  },
  {
    company: 'Dicoding',
    title: 'Belajar Membuat Aplikasi Back-End untuk Pemula',
    logo: DicodingLogo,
    month: 'Januari',
    year: '2023',
  },
  {
    company: 'Dicoding',
    title: 'Belajar Front-End Web Developer Expert',
    logo: DicodingLogo,
    month: 'December',
    year: '2022',
  },
  {
    company: 'Dicoding',
    title: 'Belajar Fundamental Front-End Web Development',
    logo: DicodingLogo,
    month: 'November',
    year: '2022',
  },
  {
    company: 'Dicoding',
    title: 'Belajar Dasar Pemrograman JavaScript',
    logo: DicodingLogo,
    month: 'September',
    year: '2022',
  },
  {
    company: 'Dicoding',
    title: 'Belajar Membuat Front-End Web untuk Pemula',
    logo: DicodingLogo,
    month: 'August',
    year: '2022',
  },
] as const;

export const Books = [
  {
    name: 'Sejarah Tuhan by Karen Armstrong',
    link: 'https://www.gramedia.com/products/sejarah-tuhan-republish',
  },
  {
    name: 'Genom: Kisah Spesies Manusia Dalam 23 Bab By Matt Ridley',
    link: 'https://www.gramedia.com/products/genom-kisah-spesies-manusia-dalam-23-bab-cover-2021',
  },
  {
    name: 'Hikayat Pohon Ganja by Lingkar Ganja Nusantara (LGN)',
    link: 'https://www.tokopedia.com/find/hikayat-ganja',
  },
  {
    name: 'You Do You by Fellexandro Ruby',
    link: 'https://www.gramedia.com/products/you-do-you-discovering-life-through-experiments-self-awareness',
  },
  {
    name: 'Halo Koding by Hilman Ramadhan',
    link: 'https://www.tokopedia.com/halokoding',
  },
] as const;

export const Tools = {
  Workstation: [
    {
      title: 'Lenovo G470 i5 gen 2 (2010)',
      description:
        'I was given a laptop from my brother which I later upgraded to double SDD storage and HDD candy. This laptop died in December 2023 while I was at bootcamp. The reason is almost 24 hours of using figma, vscode, zoom, lots of tabs open. From this laptop I can work as copywriter and get to know the world of programming',
      href: '#',
    },
    {
      title: 'Thinkpad T480 i7 gen 8',
      description:
        'I called it "laptop badak ver2". The laptop I bought in December 2023 after lenovo dead with my own money and researched the various features available. From this laptop I found a new community, namely "thinkpad Indonesia"',
      href: '#',
    },
  ],
  Software: [
    {
      title: 'Visual Studio Code',
      description: `Free editor with lots of extensions that make coding easier for me.`,
      href: 'https://code.visualstudio.com/',
    },
    {
      title: 'Figma',
      description: `I'm not a designer but it allows me to quickly mock up interfaces and play with my ideas. One day I'll learn how to use it properly.`,
      href: 'https://www.figma.com/',
    },
    {
      title: 'Notion',
      description: `I use it for everything. I have a separate workspace for each of my projects and I use it to keep track of my tasks, notes, and ideas.`,
      href: 'https://www.notion.so/',
    },
  ],
} as const;
