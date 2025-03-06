import { Link, Wrench } from "lucide-react";
import Image from "next/image";

import { OmmiAvatar } from "~/components/avatar";
import Br from "~/components/br";
import Content, {
  ContentLink,
  ContentParagraph,
  ContentTitle,
} from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getBase64Image } from "~/utils/getImageBlur";

export default function NaufalWebsite() {
  return (
    <ShellPage withBack title="Naufal Ghifari Website">
      <div>
        <Intro />
        <Stack />
        <Links />
      </div>
    </ShellPage>
  );
}

async function Intro() {
  return (
    <Section className="border-b mb-3 md:mb-8">
      <div className="flex gap-3 mb-0.5">
        <OmmiAvatar />
        <div className="w-fit">
          <ContentTitle
            title="Ommi Putera"
            description="Software Engineer (Web)"
          />
        </div>
      </div>
      <Br />
      <SingleImage
        src="/images/projects/naufal-page.jpeg"
        blurredImage={await getBase64Image("/images/projects/naufal-page.jpeg")}
      />
    </Section>
  );
}

function Stack() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Wrench className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Tech Stack">
        <ContentParagraph>
          <span>
            - React.js v18
            <br />
            - Styled Components
            <br />
            - Mantine
            <br />- TypeScript
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function Links() {
  return (
    <Section className="pt-0 md:pt-0">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Link className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Link">
        <ContentParagraph>
          Website:{" "}
          <ContentLink
            href="https://naufalghfr.vercel.app/"
            text="Naufal Ghifari"
            target="_blank"
          />
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function SingleImage({
  src,
  blurredImage,
}: {
  src: string;
  blurredImage: string;
}) {
  return (
    <div className="rounded-2xl flex flex-col gap-4 overflow-hidden">
      <Image
        src={src}
        width={1000}
        height={1000}
        alt=""
        placeholder="blur"
        blurDataURL={blurredImage}
        className="h-[calc(100vw_/_1.9)] md:h-[calc(var(--shell-page-width)_/_2.1)] object-cover border border-neutral-200 dark:border-neutral-800 rounded-2xl"
      />
    </div>
  );
}
