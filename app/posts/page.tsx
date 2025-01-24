import { Metadata } from "next";

import Image from "next/image";

import Content, { ContentParagraph } from "~/components/content";
import Section, { SectionAvatar } from "~/components/section";
import ShellPage from "~/components/shell-page";

export const metadata: Metadata = {
  title: "Ommi Putera",
  description: "",
};

export default function About() {
  return (
    <ShellPage>
      <div>
        <Me />
      </div>
    </ShellPage>
  );
}

function Me() {
  return (
    <Section withConnector>
      <SectionAvatar>
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full"
        />
      </SectionAvatar>
      <Content title="Welcome to my Posts">
        <ContentParagraph>Hai</ContentParagraph>
      </Content>
    </Section>
  );
}
