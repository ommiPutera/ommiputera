import Image from "next/image";
import Link from "next/link";

import { CornerUpRight } from "lucide-react";

import Br from "~/components/br";
import Content from "~/components/content";
import Section from "~/components/section";
import Title from "~/components/title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

export default function About() {
  return (
    <Section href="/about">
      <Title text="About">
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <CornerUpRight className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of
          experience specializing in scalable frontend and backend development
          for fintech products.
        </p>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          <span>Proven ability to lead high-impact projects</span>
          <br />
          <Link
            href="/about"
            className="font-medium text-blue-700 dark:text-blue-500 hover:underline"
          >
            Show more
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
              "me.webp",
            ].map((image) => (
              <CarouselItem
                className="pl-0.5 overflow-hidden rounded-xl max-h-[400px] max-w-[400px]"
                key={image}
              >
                <Image
                  src={`/images/${image}`}
                  width={400}
                  height={400}
                  alt=""
                  className="border border-neutral-100 dark:border-neutral-700 object-cover overflow-hidden rounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Content>
    </Section>
  );
}
