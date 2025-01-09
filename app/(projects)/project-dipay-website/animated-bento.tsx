"use cliebt";

import { Scan } from "lucide-react";

import Br from "~/components/br";
import Content, { ContentParagraph } from "~/components/content";
import Section from "~/components/section";

import Video from "next-video";
import getStarted from "/videos/animated-bento.mp4";

export default function AnimatedBento() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Scan className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Animated Bento Card">
        <ContentParagraph>
          <span>
            6/10 - Here&apos;s one of my favorite details:
            <br />
            <b>The bento-style card animations.</b>
          </span>
        </ContentParagraph>
        <Br />
        <span>
          Hovering over a card zooms the asset smoothly, adding depth and making
          interactions immersive. This subtle effect enhances browsing and
          breathes life into the layout. 🎥
        </span>
        <Br />
        <Video
          src={getStarted}
          controls={false}
          className="border rounded-xl h-[calc(100vw_/_1.2)] md:h-[calc(var(--shell-page-width)_/_1.27)]"
        />
        {/* <video
          loop
          autoPlay
          playsInline
          muted
          preload="none"
          className="border rounded-xl h-[calc(100vw_/_1.2)] md:h-[calc(var(--shell-page-width)_/_1.27)]"
        >
          <source src="/videos/animated-bento.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </Content>
    </Section>
  );
}
