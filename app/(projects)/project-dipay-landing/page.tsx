import { ChartNoAxesGantt, Sparkle } from "lucide-react";
import Image from "next/image";

import Br from "~/components/br";
import Content, { ContentParagraph, ContentTitle } from "~/components/content";
import Section, { SectionAvatar } from "~/components/section";
import ShellPage from "~/components/shell-page";
import { Website } from "~/components/website";

import { getBase64Image } from "~/utils/getImageBlur";

export default function DipayDisbursement() {
  return (
    <ShellPage withHome withBack>
      <div>
        <Intro />
        <Overview />
        <Recommendation />
      </div>
    </ShellPage>
  );
}

async function Intro() {
  return (
    <Section className="border-b mb-3 md:mb-8">
      <div className="flex gap-3 mb-2">
        <SectionAvatar>
          <Image
            src="/images/profile.jpeg"
            width={40}
            height={40}
            alt=""
            className="object-cover overflow-hidden rounded-full"
          />
        </SectionAvatar>
        <div className="w-fit">
          <ContentTitle title="Ommi Putera" description="Software Engineer" />
        </div>
      </div>
      <ContentParagraph>
        Enhanced visibility and user engagement through SEO best practices and
        modern design. 🚀
      </ContentParagraph>
      <Br />
      <SingleImage
        src="/images/projects/personal.png"
        blurredImage={await getBase64Image("/images/projects/personal.png")}
      />
      <div className="mt-3 md:mt-6">
        <Website href="https://dipay.id" />
      </div>
    </Section>
  );
}

const blurredImage = await getBase64Image("/images/me.webp");
async function Overview() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <ChartNoAxesGantt className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Overview">
        <ContentParagraph>
          The principles that guide my work and life.
        </ContentParagraph>
        <div className="mt-2">
          <ContentParagraph className="font-bold">
            Continuous Learning
          </ContentParagraph>
          <ContentParagraph>
            I see learning as an ongoing journey. Staying curious and embracing
            new ideas and technologies drive my personal growth and keep me
            adaptable in a fast-changing industry.
          </ContentParagraph>
        </div>
        <Br />
        <div>
          <ContentParagraph className="font-bold">Empathy</ContentParagraph>
          <ContentParagraph>
            Empathy bridges the gap between technology and the people it serves.
            By understanding the needs and perspectives of users and clients, I
            create products that are not only functional but also meaningful and
            impactful.
          </ContentParagraph>
        </div>
        <Br />
        <div>
          <ContentParagraph className="font-bold">
            A Shared Desire for Life
          </ContentParagraph>
          <ContentParagraph>
            Life is precious — not just for us but for all living beings.
            Recognizing this shared desire inspires me to live and work with
            compassion and respect for the world around us.
          </ContentParagraph>
        </div>
        <Br />
        <div className="border border-neutral-200 dark:border-neutral-800 h-[400px] md:h-[500px] rounded-2xl flex flex-col gap-4 overflow-hidden">
          <Image
            src="/images/me.webp"
            width={1000}
            height={1000}
            alt=""
            placeholder="blur"
            blurDataURL={blurredImage}
            className="h-full object-cover"
          />
        </div>
        <Br />
        <ContentParagraph>
          The best way to get in touch with me is to email{" "}
          <b>me@ommiputera.com</b>
        </ContentParagraph>
        <Br />
      </Content>
    </Section>
  );
}

function Recommendation() {
  return (
    <Section className="pt-0 md:pt-0 mb-6">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="More">
        <ContentParagraph>
          Navigate to another page to dive deeper!
        </ContentParagraph>
        <Br />
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
