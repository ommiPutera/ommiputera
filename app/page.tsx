import Image from "next/image";
import Link from "next/link";

import {
  Briefcase,
  CarFront,
  CornerUpRight,
  Dot,
  Library,
  MonitorSmartphone,
  PenLine,
} from "lucide-react";

import Br from "~/components/br";
import Content from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";
import Title from "~/components/title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTitle,
} from "~/components/ui/timeline";
import Projects from "~/components/sections/projects.section";

export default function Home() {
  return (
    <ShellPage>
      <Hi />
      <About />
      <Work />
      <Blog />
      <Education />
      <Projects />
      <Uses />
      <Contact />
    </ShellPage>
  );
}

function Hi() {
  return (
    <Section>
      <Title text="Hi, I'm Ommi Putera 👋">
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full border border-neutral-200"
        />
      </Title>
      <Content>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          Software Engineer based in Jakarta, Indonesia. I love building things
          with{" "}
          <Link
            href="https://remix.run/"
            target="_blank"
            className="text-blue-700 font-medium hover:underline"
          >
            Remix
          </Link>
          .
        </p>
      </Content>
    </Section>
  );
}

function About() {
  return (
    <Section href="/about">
      <Title text="About">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <CornerUpRight className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of
          experience specializing in scalable frontend and backend development
          for fintech products.
        </p>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          <span>Proven ability to lead high-impact projects</span>
          <br />
          <Link
            href="/about"
            className="font-medium text-blue-700 hover:underline"
          >
            Show more
          </Link>
        </p>
      </Content>
      <Br />
      <Content>
        <Carousel>
          <CarouselContent overflowVisible className="-ml-0.5">
            {[
              "ommi-original.webp",
              "my-laptop.webp",
              "teams-work.webp",
              "beach.jpg",
              "me.webp",
            ].map((image) => (
              <CarouselItem
                className="pl-0.5 overflow-hidden rounded-xl max-h-[400px] max-w-[400px]"
                key={image}
              >
                <Image
                  src={`/images/${image}`}
                  width={400}
                  height={400}
                  alt=""
                  className="border border-neutral-100 object-cover overflow-hidden rounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Content>
    </Section>
  );
}

function Work() {
  return (
    <Section href="https://www.linkedin.com/in/ommiputera">
      <Title text="Work Experience">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <Briefcase className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          During my time at{" "}
          <Link
            href="https://dipay.id/"
            target="_blank"
            className="text-blue-700 font-medium hover:underline"
          >
            Dipay
          </Link>
          , I have contributed significantly to various projects, refining my
          skills in Web Standard, React, TypeScript, and CI/CD. My journey from
          Frontend Engineer to Fullstack Engineer has been marked by leading the
          development of Dipay Disbursement, a scalable web application for
          payments.
        </p>
        <Link
          href="https://www.linkedin.com/in/ommiputera"
          target="_blank"
          className="border border-neutral-200 rounded-xl px-2 py-3 md:px-3 md:py-4 flex flex-col gap-4 hover:bg-slate-50 hover:border-blue-700 focus-visible:bg-slate-100"
        >
          <div className="flex items-start gap-2.5">
            <Image
              src="/logos/dipayindonesia_logo.webp"
              width={40}
              height={40}
              alt=""
              className="border border-neutral-100 overflow-hidden"
            />
            <div>
              <h4 className="text-sm font-semibold tracking-normal text-neutral-900">
                Dipay Indonesia
              </h4>
              <p className="text-xs md:text-sm mt-0.5 font-normal text-accent-foreground inline-flex items-center">
                <span>Full-time</span>
                <Dot className="text-slate-400 w-3 h-3" />
                <span>3yrs 2mos</span>
              </p>
              <p className="text-xs md:text-sm font-normal text-muted-foreground">
                Jakarta, Indonesia - On-site
              </p>
            </div>
          </div>
          <div className="pl-4">
            <Timeline>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon />
                  <TimelineTitle>Full Stack Engineer</TimelineTitle>
                </TimelineHeader>
                <TimelineContent className="pr-0">
                  <TimelineDate className="flex items-center">
                    <span>Jul 2024 - Present</span>
                    <Dot className="text-slate-400 w-3 h-3" />
                    <span>5mos</span>
                  </TimelineDate>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineHeader>
                  <TimelineIcon />
                  <TimelineTitle>Frontend Engineer</TimelineTitle>
                </TimelineHeader>
                <TimelineContent className="pr-0">
                  <TimelineDate className="flex items-center">
                    <span>Oct 2021 - Jul 2024</span>
                    <Dot className="text-slate-400 w-3 h-3" />
                    <span>2yrs 10mos</span>
                  </TimelineDate>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </Link>
      </Content>
    </Section>
  );
}

function Education() {
  return (
    <Section>
      <Title text="Education">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <Library className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          Purwadhika helped me dive into the world of web development. I learned
          how to build websites and apps, and also how to become an effective
          learner.
        </p>
        <div className="border border-neutral-200 rounded-xl px-2 py-3 md:px-3 md:py-4 flex flex-col gap-4">
          <div className="flex items-start gap-2.5">
            <Image
              src="/logos/purwadhika_logo.webp"
              width={40}
              height={40}
              alt=""
              className="border border-neutral-100 overflow-hidden"
            />
            <div>
              <h4 className="text-sm font-semibold tracking-normal text-neutral-900">
                Purwadhika Digital Technology School
              </h4>
              <p className="text-xs md:text-sm font-normal text-muted-foreground">
                Jan 2021 - Aug 2021
              </p>
              <p className="text-xs md:text-sm mt-0.5 font-normal text-accent-foreground inline-flex items-center">
                Full Stack Web and Mobile Development
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Image
              src="/logos/unib_logo.webp"
              width={40}
              height={40}
              alt=""
              className="border border-neutral-100 overflow-hidden"
            />
            <div>
              <h4 className="text-sm font-semibold tracking-normal text-neutral-900">
                University of Bengkulu
              </h4>
              <p className="text-xs md:text-sm font-normal text-muted-foreground">
                Aug 2016 - Aug 2020
              </p>
              <p className="text-xs md:text-sm mt-0.5 font-normal text-accent-foreground inline-flex items-center">
                Bachelor of Economics
              </p>
            </div>
          </div>
        </div>
      </Content>
    </Section>
  );
}

function Blog() {
  return (
    <Section>
      <Title text="Blog" description="WIP">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <PenLine className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          My blog is a work in progress. I&apos;m looking forward to sharing my
          thoughts and insights soon. 💪
        </p>
      </Content>
    </Section>
  );
}

function Uses() {
  return (
    <Section>
      <Title text="Uses">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <CarFront className="w-5 h-5" />
        </div>
      </Title>
    </Section>
  );
}

function Contact() {
  return (
    <Section>
      <Title text="Contact">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <MonitorSmartphone className="w-5 h-5" />
        </div>
      </Title>
    </Section>
  );
}
