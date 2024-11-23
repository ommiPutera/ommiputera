import { CornerUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Br from "~/components/br";
import Content from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";
import Title from "~/components/title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

export default function About() {
  return (
    <ShellPage title="About Ommi" withHome aThread>
      <Me />
      <Section2 />
    </ShellPage>
  );
}

function Me() {
  return (
    <Section withConnector>
      <Title text="About">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <CornerUpRight className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of
          experience specializing in scalable frontend and backend development
          for fintech products.
        </p>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          Proven ability to lead high-impact projects, build seamless user
          experiences, and contribute to a collaborative team environment.
        </p>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          Expertise in React, Next.js, Remix, Node.js, and Nest.js, with a
          strong focus on stability, performance, and security.
        </p>
        <p className="text-sm font-normal text-accent-foreground leading-5">
          I enjoy taking on new challenges and continuously improving my skills.
          Feel free to browse through my portfolio to see examples of my work.
          If you&apos;d like to collaborate or just say hello, don&apos;t
          hesitate to reach out!
        </p>
        <p className="text-sm font-medium text-accent-foreground leading-5">
          <span>You can follow me on</span>{" "}
          <Link href="" target="_blank" className="text-blue-700">
            Twitter,{" "}
          </Link>
          <Link href="" target="_blank" className="text-blue-700">
            LinkedIn,{" "}
          </Link>
          <Link href="" target="_blank" className="text-blue-700">
            Github,{" "}
          </Link>
          <Link href="" target="_blank" className="text-blue-700">
            Instagram.
          </Link>
        </p>
      </Content>
      <Br />
      <Content>
        <Carousel>
          <CarouselContent overflowVisible className="-ml-0.5">
            {[
              "ommi-original.webp",
              "my-laptop.webp",
              "teams-work.webp",
              "beach.jpg",
              "me.jpg",
            ].map((image) => (
              <CarouselItem
                className="pl-0.5 overflow-hidden rounded-xl"
                key={image}
              >
                <Image
                  src={`/images/${image}`}
                  width={500}
                  height={500}
                  alt=""
                  className="border border-neutral-100  object-cover overflow-hidden rounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Content>
    </Section>
  );
}

function Section2() {
  return (
    <Section className="pt-0 md:pt-0">
      <Title text="Hello">
        <div className="border border-neutral-200 h-10 w-10 flex justify-center items-center rounded-full">
          <CornerUpRight className="w-5 h-5" />
        </div>
      </Title>
    </Section>
  );
}
