import Image from "next/image";
import { CornerUpRight } from "lucide-react";

import ShellPage from "~/components/shell-page";
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel";

export default function Home() {
  return (
    <ShellPage>
      <About />
      <div className="flex flex-col p-6 overflow-hidden">
        flexx
      </div>
    </ShellPage>
  );
};

function About() {
  return (
    <div className="flex flex-col p-6 overflow-hidden">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="border border-neutral-400 p-1 rounded-lg">
          <CornerUpRight className="w-5 h-5" />
        </div>
        <h2 className="text-base md:text-xl font-extrabold tracking-tight">About</h2>
      </div>
      <div className="pl-[38px] md:pl-[46px] flex flex-col gap-4 mb-4">
        <p className="text-sm md:text-base font-normal text-accent-foreground leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of experience specializing in scalable frontend and backend development for fintech products.
        </p>
        <p className="text-sm md:text-base font-normal text-accent-foreground leading-5">
          Proven ability to lead high-impact projects, build seamless user experiences, and contribute to a collaborative team environment. Expertise in React, Next.js, Remix, Node.js, and Nest.js, with a strong focus on stability, performance, and security.
        </p>
      </div>
      <div className="pl-[38px] md:pl-[46px]">
        <Carousel>
          <CarouselContent overflowVisible className="-ml-1">
            <CarouselItem className="pl-1 h-[310px] md:h-[420px] overflow-hidden">
              <Image
                src="/images/profile.jpeg"
                width={500}
                height={500}
                alt=""
              />
            </CarouselItem>
            <CarouselItem className="pl-1 h-[310px] md:h-[420px] overflow-hidden">
              <Image
                src="/images/ommi_original.jpg"
                width={500}
                height={500}
                alt=""
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}