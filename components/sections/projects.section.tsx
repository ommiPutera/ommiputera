import { ArrowUpRight, FolderClosed, FolderOpen, Sparkle } from "lucide-react";
import Image from "next/image";

import Link, { LinkProps } from "next/link";

import Content from "~/components/content";
import Section from "~/components/section";
import Title from "~/components/title";

export default function Projects() {
  return (
    <div>
      <Intro />
      <DipayCore />
      <DipayDisbursement />
      <Dipay />
      <Naufal />
      <Close />
    </div>
  );
}

function Intro() {
  return (
    <Section withConnector>
      <Title text="Projects 🔥">
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <FolderOpen className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          <span>
            Here are some showcase of my latest projects. They&apos;re sure to
            catch your eye!
          </span>
          <br />
          <Link
            href="/about"
            className="font-medium text-blue-700 hover:underline"
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
    <Section className="pt-0 md:pt-0" href="/">
      <Title text="More Project">
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <FolderClosed className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          <span>Interested in checking out more? </span>
          <Link
            href="/about"
            className="font-medium text-blue-700 hover:underline"
          >
            View all
          </Link>
        </p>
      </Content>
    </Section>
  );
}

function DipayCore() {
  return (
    <Section
      href="/"
      withConnector
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <Title
        text="In Charge of Development for Dipay Core"
        description="Dipay Indonesia"
      >
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <Sparkle className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Improve the accuracy and efficiency of image recognition technology.
          By creating our own tools, we can customize the annotation process to
          fit the specific needs and requirements, rather than relying on
          third-party tools.
        </p>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image
            src="/images/projects/dipay-core.jpeg"
            width={800}
            height={400}
            alt=""
          />
        </div>
      </Content>
      <ReadMore href="/" />
    </Section>
  );
}

function Dipay() {
  return (
    <Section
      href="/"
      withConnector
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <Title
        text="Revamped a Landing Page using Next.js"
        description="Dipay Indonesia"
      >
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <Sparkle className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Improve the accuracy and efficiency of image recognition technology.
          By creating our own tools, we can customize the annotation process to
          fit the specific needs and requirements, rather than relying on
          third-party tools.
        </p>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image
            src="/images/projects/personal-page.jpeg"
            width={800}
            height={400}
            alt=""
          />
        </div>
      </Content>
      <ReadMore href="/" />
    </Section>
  );
}

function Naufal() {
  return (
    <Section
      href="/"
      withConnector
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <Title
        text="Personal/Porfolio Website for Naufal Ghifari"
        description="2022"
      >
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <Sparkle className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Improve the accuracy and efficiency of image recognition technology.
          By creating our own tools, we can customize the annotation process to
          fit the specific needs and requirements, rather than relying on
          third-party tools.
        </p>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image
            src="/images/projects/naufal-page.jpeg"
            width={800}
            height={400}
            alt=""
          />
        </div>
      </Content>
      <ReadMore href="/" />
    </Section>
  );
}

function DipayDisbursement() {
  return (
    <Section
      href="/"
      withConnector
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <Title
        text="Development of Dipay Disbursement"
        description="Dipay Indonesia - 2024"
      >
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <Sparkle className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Improve the accuracy and efficiency of image recognition technology.
          By creating our own tools, we can customize the annotation process to
          fit the specific needs and requirements, rather than relying on
          third-party tools.
        </p>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image
            src="/images/projects/dipay-disburesment.jpeg"
            width={800}
            height={400}
            alt=""
          />
        </div>
      </Content>
      <ReadMore href="/" />
    </Section>
  );
}

function ReadMore({ href }: { href: LinkProps["href"] }) {
  return (
    <Content>
      <div className="mt-4 md:mt-2">
        <Link
          href={href}
          className="text-sm font-semibold text-blue-700 underline inline-flex items-center gap-1"
        >
          <span>Read more</span>
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </Content>
  );
}
