import { Library } from "lucide-react";

import Image from "next/image";

import Content from "~/components/content";
import Section from "~/components/section";
import Title from "~/components/title";

export default function Education() {
  return (
    <Section>
      <Title text="Education">
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <Library className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Purwadhika helped me dive into the world of web development. I learned
          how to build websites and apps, and also how to become an effective
          learner.
        </p>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl px-2 py-3 md:px-3 md:py-4 flex flex-col gap-4">
          <div className="flex items-start gap-2.5">
            <Image
              src="/logos/purwadhika_logo.webp"
              width={40}
              height={40}
              alt=""
              className="border border-neutral-100 dark:border-neutral-700 overflow-hidden"
            />
            <div>
              <h4 className="text-sm font-semibold tracking-normal text-neutral-900 dark:text-neutral-100">
                Purwadhika Digital Technology School
              </h4>
              <p className="text-xs md:text-sm font-normal text-muted-foreground mt-1">
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
              className="border border-neutral-100 dark:border-neutral-700 overflow-hidden"
            />
            <div>
              <h4 className="text-sm font-semibold tracking-normal leading-4 text-neutral-900 dark:text-neutral-100">
                University of Bengkulu
              </h4>
              <p className="text-xs md:text-sm font-normal text-muted-foreground mt-1">
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
