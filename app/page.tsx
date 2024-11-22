import Image from "next/image";
import { Briefcase, CornerUpRight } from "lucide-react";

import ShellPage from "~/components/shell-page";
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel";
import Link from "next/link";

export default function Home() {
  return (
    <ShellPage>
      <About />
      <Work />
    </ShellPage>
  );
};

function About() {
  return (
    <div className="flex flex-col px-4 py-6 md:p-6 overflow-hidden">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="border border-neutral-400 p-1 rounded-lg">
          <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <h2 className="text-base md:text-xl font-bold tracking-tight">About</h2>
      </div>
      <div className="pt-4 md:pl-[46px] md:pt-0 flex flex-col gap-4">
        <p className="text-sm md:text-base font-normal text-accent-foreground leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of experience specializing in scalable frontend and backend development for fintech products.
        </p>
        <p className="text-sm md:text-base font-normal text-accent-foreground leading-5">
          <span>
            Proven ability to lead high-impact projects, build seamless user experiences, and contribute to a collaborative team environment.
          </span>
          <br />
          <Link href="/about" className="font-medium text-blue-600">
            Show more..
          </Link>
        </p>
      </div>
      <div className="md:pl-[46px] mt-4">
        <Carousel>
          <CarouselContent overflowVisible className="-ml-1.5">
            <CarouselItem className="pl-1.5 overflow-hidden rounded-3xl">
              <Image
                src="/images/profile.jpeg"
                width={500}
                height={500}
                alt=""
              />
            </CarouselItem>
            <CarouselItem className="pl-1.5 overflow-hidden rounded-3xl">
              <Image
                src="/images/profile.jpeg"
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

function Work() {
  return (
    <div className="flex flex-col px-4 py-6 md:p-6 overflow-hidden">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="border border-neutral-400 p-1 rounded-lg">
          <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <h2 className="text-base md:text-xl font-bold tracking-tight">Work Experience</h2>
      </div>
      <div className="pt-4 md:pl-[46px] md:pt-0 flex flex-col gap-4 mb-4">
        <p className="text-sm md:text-base font-normal text-accent-foreground leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of experience specializing in scalable frontend and backend development for fintech products.
        </p>
        <p className="text-sm md:text-base font-normal text-accent-foreground leading-5">
          <span>
            Proven ability to lead high-impact projects, build seamless user experiences, and contribute to a collaborative team environment.
          </span>
          <br />
          <Link href="/about" className="font-medium text-blue-600">
            Show more..
          </Link>
        </p>
      </div>
    </div>
  )
}