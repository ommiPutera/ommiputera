import { File, FolderOpen } from "lucide-react";

import Link from "next/link";

import Content from "~/components/content";
import Section from "~/components/section";
import Title from "~/components/title";

export default function Projects() {
  return (
    <div>
      <Intro />
      <List />
    </div>
  );
}

function Intro() {
  return (
    <Section withConnector>
      <Title text="Projects">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <FolderOpen className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          <span>
            Here are some showcase of my latest projects. They&apos;re sure to
            catch your eye!
          </span>
          <br />
          <Link
            href="/about"
            className="font-medium text-blue-700 hover:underline"
          >
            Show more
          </Link>
        </p>
      </Content>
    </Section>
  );
}

function List() {
  return (
    <Section className="pt-0 md:pt-0">
      <Title
        text="Revamped a Landing Page using Next.js"
        description="Dipay Indonesia"
      >
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <File className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          List
        </p>
      </Content>
    </Section>
  );
}
