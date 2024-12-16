import Image from "next/image";

import { ContentParagraph } from "~/components/content";
import {
  Container,
  FullContainer,
  ProjectShell,
} from "~/components/project-shell";
import { Website } from "~/components/website";

import { getBase64Image } from "~/utils/getImageBlur";

export default async function ProjectDipayDisbursement() {
  return (
    <ProjectShell>
      <Container>
        <div className="text-center mt-12 flex flex-col items-center">
          <h2 className="text-2xl leading-7 sm:text-3xl sm:leading-normal md:text-4xl lg:text-5xl font-extrabold w-full mb-4">
            Revamped a landing page using Next.js
          </h2>
          <ContentParagraph className="text-base md:text-lg">
            Implementing SEO best practices to enhance visibility while
            delivering a modern, high-performance design that reduced load times
            and boosted user engagement.
          </ContentParagraph>
        </div>
      </Container>
      <FullContainer>
        <div className="md:bg-neutral-300/30 backdrop-blur-sm md:dark:bg-neutral-800/30 md:py-14 text-center px-4">
          <Image
            src="/images/projects/personal.png"
            width={1000}
            height={1000}
            alt=""
            placeholder="blur"
            blurDataURL={await getBase64Image("/images/projects/personal.png")}
            className="object-cover rounded-xl h-[calc(100vw_-_45vw)] md:h-[600px] mx-auto"
          />
          <div className="mt-3 md:mt-6">
            <Website href="https://dipay.id" />
          </div>
        </div>
      </FullContainer>
      <Container>test</Container>
    </ProjectShell>
  );
}
