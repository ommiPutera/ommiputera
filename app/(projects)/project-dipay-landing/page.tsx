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
        <div className="text-center">
          <h2 className="text-3xl leading-8 sm:leading-normal sm:text-4xl lg:text-5xl font-extrabold w-full my-4">
            Revamped a Landing Page using Next.js
          </h2>
          <p className="c font-medium text-neutral-700 dark:text-neutral-200">
            I revamped the Dipay landing page using Next.js, implementing SEO
            best practices to enhance visibility while delivering a modern,
            high-performance design that reduced load times and boosted user
            engagement. 🚀
          </p>
        </div>
      </Container>
      <FullContainer>
        <div className="md:bg-neutral-200/30 backdrop-blur-sm md:dark:bg-neutral-800/30 md:py-14 text-center px-4">
          <Image
            src="/images/projects/personal.png"
            width={1000}
            height={1000}
            alt=""
            placeholder="blur"
            blurDataURL={await getBase64Image("/images/projects/personal.png")}
            className="object-cover rounded-xl h-full max-h-[600px] mx-auto border border-neutral-200 shadow-sm"
          />
          <div className="mt-3 md:mt-6">
            <Website href="https://dipay.id" />
          </div>
        </div>
      </FullContainer>
      <Container>
        <div>
          <ContentParagraph>
            I revamped the Dipay landing page using Next.js, implementing SEO
            best practices to enhance visibility while delivering a modern,
            high-performance design that reduced load times and boosted user
            engagement. 🚀
          </ContentParagraph>
        </div>
      </Container>
    </ProjectShell>
  );
}