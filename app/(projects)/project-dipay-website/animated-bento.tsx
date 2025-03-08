import { Scan } from "lucide-react";

import Br from "~/components/br";
import Content, { ContentParagraph } from "~/components/content";
import Section from "~/components/section";

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
        <div
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src="https://www.loom.com/embed/424574ee3c694fe9b7f9d8ece36ca1ef?sid=c4d111d5-b0bc-4d51-b6d9-944f37c89eea"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      </Content>
    </Section>
  );
}
