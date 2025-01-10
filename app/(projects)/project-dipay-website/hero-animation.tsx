import { Play } from "lucide-react";
import Player from 'next-video/player';

import Br from "~/components/br";
import Content, { ContentParagraph } from "~/components/content";
import Section from "~/components/section";

export default async function HeroAnimation() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Play className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Hero Animation">
        <ContentParagraph>
          <span>
            5/10 - Some pages now feature hero animations that are incredibly
            smooth.
          </span>
        </ContentParagraph>
        <Br />
        <Player
          loop
          autoPlay
          muted
          // controls={false}
          playsInline
          src="https://ffg45va0vgszoqqt.public.blob.vercel-storage.com/hero-animation-0MsDZhsGWhcOXhMvRGwJBwbzL3H2DA.mp4"
          className="border overflow-hidden rounded-xl h-[calc(100vw_/_2.5)] md:h-[calc(var(--shell-page-width)_/_2.7)]"
        />
      </Content>
    </Section>
  );
}
