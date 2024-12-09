import { ArrowUpRight, FolderClosed, FolderOpen, Sparkle } from "lucide-react";
import Image from "next/image";

import Link, { LinkProps } from "next/link";
import Br from "~/components/br";

import Content from "~/components/content";
import Section from "~/components/section";

export default function Projects() {
  return (
    <div>
      <Intro />
      {/* <DipayDisbursement /> */}
      {/* <DipayCore /> */}
      <Dipay />
      <Naufal />
      <Close />
    </div>
  );
}

function Intro() {
  return (
    <Section withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <FolderOpen className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Projects 🔥" description="Curated">
        <p className="text-sm prose dark:prose-invert">
          Here are some showcase of my latest projects.
        </p>
        <Br />
        <p className="text-sm prose dark:prose-invert">
          They&apos;re sure to catch your eye!
        </p>
        <p className="text-sm prose dark:prose-invert">
          <Link
            href="/projects"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Show more
          </Link>
        </p>
      </Content>
    </Section>
  );
}

function Close() {
  return (
    <Section className="pt-0 md:pt-0">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <FolderClosed className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="More Project">
        <p className="text-sm prose dark:prose-invert">
          <span>Interested in checking out more? </span>
          <Link
            href="/projects"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all
          </Link>
        </p>
      </Content>
    </Section>
  );
}

// function DipayCore() {
//   return (
//     <Section
//       withConnector
//       href="/dipay-core-dashboard"
//       className="pt-0 md:pt-0"
//       connectorClassName="top-0 h-[calc(100%_-_0px)]"
//     >
//       <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
//         <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
//       </div>
//       <Content
//         title="Building a Dipay Core Dashboard"
//         description="Dipay Indonesia"
//       >
//         <p className="text-sm prose dark:prose-invert">
//           Improve the accuracy and efficiency of image recognition technology.
//           By creating our own tools, we can customize the annotation process to
//           fit the specific needs and requirements, rather than relying on
//           third-party tools.
//         </p>
//         <Br />
//         <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
//           <Image
//             src="/images/projects/dipay-core.jpeg"
//             width={800}
//             height={400}
//             alt=""
//           />
//         </div>
//       </Content>
//       <ReadMore href="/" />
//     </Section>
//   );
// }

function Dipay() {
  return (
    <Section
      withConnector
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content
        title="Revamped a Landing Page using Next.js"
        description="Dipay Indonesia"
      >
        <p className="text-sm prose dark:prose-invert">
          Improve the accuracy and efficiency of image recognition technology.
          By creating our own tools, we can customize the annotation process to
          fit the specific needs and requirements, rather than relying on
          third-party tools.
        </p>
        <Br />
        <ProjectCover src="/images/projects/personal-page.jpeg" />
      </Content>
      <ReadMore href="/" />
    </Section>
  );
}

function Naufal() {
  return (
    <Section
      withConnector
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content
        title="Personal/Porfolio Website for Naufal Ghifari"
        description="2022"
      >
        <p className="text-sm prose dark:prose-invert">
          Improve the accuracy and efficiency of image recognition technology.
          By creating our own tools, we can customize the annotation process to
          fit the specific needs and requirements, rather than relying on
          third-party tools.
        </p>
        <Br />
        <ProjectCover src="/images/projects/naufal-page.jpeg" />
      </Content>
      <ReadMore href="/" />
    </Section>
  );
}

// function DipayDisbursement() {
//   return (
//     <Section
//       href="/dipay-disbursement"
//       withConnector
//       className="pt-0 md:pt-0"
//       connectorClassName="top-0 h-[calc(100%_-_0px)]"
//     >
//       <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
//         <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
//       </div>
//       <Content
//         title="Building a Dipay Enterprise Disbursement"
//         description="Dipay Indonesia - 2024"
//       >
//         <ContentParagraph>
//           Improve the accuracy and efficiency of image recognition technology.
//           By creating our own tools, we can customize the annotation process to
//           fit the specific needs and requirements, rather than relying on
//           third-party tools.
//         </ContentParagraph>
//         <Br />
//         <ProjectCover src="/images/projects/dipay-disburesment.jpeg" />
//       </Content>
//       <ReadMore href="/" />
//     </Section>
//   );
// }

function ReadMore({ href }: { href: LinkProps["href"] }) {
  return (
    <div className="mt-1 ml-[48px]">
      <Link
        href={href}
        className="text-sm font-semibold text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-1"
      >
        <span>Read more</span>
        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </Link>
    </div>
  );
}

function ProjectCover({ src }: { src: string }) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
      <Image src={src} width={800} height={400} alt="" />
    </div>
  );
}
