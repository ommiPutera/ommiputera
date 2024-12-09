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

export default function Work() {
  return (
    <Section>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <BriefcaseBusiness className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Work Experience">
        <ContentParagraph>
          I&apos;ve been growing my career at{" "}
          <Link
            href="https://dipay.id/"
            target="_blank"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Dipay
          </Link>
          , starting as a Frontend Engineer and progressing to a Full Stack
          Engineer. Along the way, I’ve honed my skills in Web Standards, React,
          TypeScript, and CI/CD, gaining invaluable hands-on experience in
          building robust and scalable applications.
        </ContentParagraph>
        <Br />
        <ContentParagraph>
          One of my most rewarding projects has been leading the development of{" "}
          <b>Dipay Enterprise Disbursement</b>, a scalable web application that
          automates mass fund transfers for businesses. This solution has not
          only streamlined operations but also strengthened partnerships, making
          a tangible impact. Tackling this challenge has fueled my drive to keep
          learning and creating software that delivers meaningful results.
        </ContentParagraph>
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
              <p className="text-xs md:text-sm mt-0.5 font-normal  inline-flex items-center">
                <span>Full-time</span>
              </p>
              <p className="text-sm font-normal text-muted-foreground">
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
                    <span>Jul 2024 - Present</span>
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
