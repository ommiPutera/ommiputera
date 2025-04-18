"use client";

import Image from "next/image";
import Link from "next/link";

import { BriefcaseBusiness } from "lucide-react";

import Br from "~/components/br";
import Content, { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
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
import React from "react";

export default function Work() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <Section>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <BriefcaseBusiness className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Experience">
        {isExpanded ? (
          <>
            <ContentParagraph>
              I worked as a Full Stack Engineer at Dipay, where I was responsible for developing complex, end-to-end solutions that contributed to business success.
            </ContentParagraph>
            <Br />
            <ContentParagraph>
              My technical expertise includes React and TypeScript, which I used to build highly maintainable and efficient applications.
            </ContentParagraph>
            <Br />
            <ContentParagraph>
              One of my significant achievements at Dipay was leading the development of Dipay Enterprise (Disbursement), a web app designed to automate mass fund transfers for businesses.
            </ContentParagraph>
          </>
        ) : (
          <>
            <ContentParagraph>
              I work as a Full Stack Engineer at Dipay and am responsible for
              developing complex, end-to-end solutions that drive business
              success.
            </ContentParagraph>
            <ContentParagraph>
              <span
                className="text-sm cursor-pointer font-semibold text-blue-600 dark:text-blue-400 underline"
                onClick={() => setIsExpanded(true)}
              >
                Show more
              </span>
            </ContentParagraph>
          </>
        )}
        <Br />
        <Link
          href="https://www.linkedin.com/in/ommiputera"
          target="_blank"
          className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 md:px-3 md:py-4 flex flex-col gap-4 hover:bg-neutral-50 hover:dark:bg-neutral-900"
        >
          <div className="flex items-start gap-2.5">
            <div className="w-full max-w-10">
              <Image
                src="/logos/dipayindonesia_logo.webp"
                width={40}
                height={40}
                alt=""
                className="overflow-hidden"
              />
            </div>
            <div className="w-full">
              <h3 className="text-xs md:text-sm font-semibold tracking-normal text-neutral-900 dark:text-neutral-100">
                Dipay Indonesia
              </h3>
              <p className="text-xs md:text-sm mt-0.5 font-normal inline-flex items-center">
                <span>Full-time</span>
              </p>
              <p className="text-xs md:text-sm font-normal text-muted-foreground">
                Jakarta, Indonesia
              </p>
            </div>
          </div>
          <div className="pl-4">
            <Timeline>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon />
                  <TimelineTitle className="text-xs md:text-sm">
                    Full Stack Engineer
                  </TimelineTitle>
                </TimelineHeader>
                <TimelineContent className="pr-0">
                  <TimelineDate className="flex items-center flex-wrap">
                    <span>Jul 2024 - Mar 2025</span>
                  </TimelineDate>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineHeader>
                  <TimelineIcon />
                  <TimelineTitle className="text-xs md:text-sm">
                    Frontend Engineer
                  </TimelineTitle>
                </TimelineHeader>
                <TimelineContent className="pr-0">
                  <TimelineDate className="flex items-center flex-wrap">
                    <span>Oct 2021 - Jul 2024</span>
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
