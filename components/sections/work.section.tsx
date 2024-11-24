import Image from "next/image";
import Link from "next/link";

import { Briefcase, Dot } from "lucide-react";

import Content from "~/components/content";
import Section from "~/components/section";
import Title from "~/components/title";
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

export default function Work() {
  return (
    <Section>
      <Title text="Work Experience">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <Briefcase className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
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
          className="border border-neutral-200 rounded-xl px-2 py-3 md:px-3 md:py-4 flex flex-col gap-4 hover:bg-slate-50 focus-visible:bg-slate-100"
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
