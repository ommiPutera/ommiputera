"use client";

import { BookText } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import Br from "~/components/br";
import Content, { ContentParagraph } from "~/components/content";
import Section from "~/components/section";

export default function Education() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <Section>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <BookText className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Education">
        {isExpanded ? (
          <ContentParagraph>
            Purwadhika was the starting point of my web development journey. Its
            comprehensive curriculum provided me with a strong foundation in
            both front-end and back-end development.
          </ContentParagraph>
        ) : (
          <>
            <ContentParagraph>
              Purwadhika was the starting point of my web development journey.
              Its comprehensive curriculum provided
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
          <div className="flex items-start gap-2.5 w-full">
            <div className="w-full max-w-10">
              <Image
                src="/logos/purwadhika_logo.webp"
                width={80}
                height={80}
                alt=""
                className="overflow-hidden h-10 w-10"
              />
            </div>
            <div className="w-full">
              <h3 className="text-xs md:text-sm font-semibold tracking-normal text-neutral-900 dark:text-neutral-100">
                Purwadhika Digital Technology School
              </h3>
              <p className="text-xs md:text-sm font-normal text-muted-foreground">
                Jan 2021 - Aug 2021
              </p>
              <p className="text-xs md:text-sm mt-0.5 font-normal  inline-flex items-center">
                Full Stack Web and Mobile Development
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="w-full max-w-10">
              <Image
                src="/logos/unib_logo.webp"
                width={80}
                height={80}
                alt=""
                className="overflow-hidden h-10 w-10"
              />
            </div>
            <div className="w-full">
              <h3 className="text-xs md:text-sm font-semibold tracking-normal leading-4 text-neutral-900 dark:text-neutral-100">
                University of Bengkulu
              </h3>
              <p className="text-xs md:text-sm font-normal text-muted-foreground">
                Aug 2016 - Aug 2020
              </p>
              <p className="text-xs md:text-sm mt-0.5 font-normal  inline-flex items-center">
                Bachelor of Economics
              </p>
            </div>
          </div>
        </Link>
      </Content>
    </Section>
  );
}
