import Image from "next/image";
import Link from "next/link";

import { Briefcase, CornerUpRight, Dot } from "lucide-react";

import ShellPage from "~/components/shell-page";
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel";
import { Timeline, TimelineConnector, TimelineContent, TimelineDate, TimelineDescription, TimelineHeader, TimelineIcon, TimelineItem, TimelineTitle } from "~/components/ui/timeline";

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
    <div className="flex flex-col px-4 py-8 md:p-6 overflow-hidden">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="border border-neutral-400 p-1 rounded-lg">
          <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <h2 className="text-sm md:text-base font-bold tracking-tight">About</h2>
      </div>
      <div className="pt-2 md:pl-[46px] md:pt-0 flex flex-col gap-4">
        <p className="text-sm md:text-base font-normal text-accent-foreground leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of experience specializing in scalable frontend and backend development for fintech products.
        </p>
        <p className="text-sm md:text-base font-normal text-accent-foreground leading-5 -mb-2">
          <span>
            Proven ability to lead high-impact projects, build seamless user experiences, and contribute to a collaborative team environment.
          </span>
          <br />
          <Link href="/about" className="font-medium text-blue-700 hover:underline">
            Show more
          </Link>
        </p>
      </div>
      <div className="md:pl-[46px] mt-4">
        <Carousel>
          <CarouselContent overflowVisible className="-ml-0.5">
            {["ommi-original.webp", "my-laptop.webp", "teams-work.webp"].map((image) => (
              <CarouselItem className="pl-0.5 overflow-hidden rounded-xl" key={image}>
                <Image
                  src={`/images/${image}`}
                  width={500}
                  height={500}
                  alt=""
                  className="border border-neutral-100 overflow-hidden rounded-xl"
                />
              </CarouselItem>
            ))}
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
        <h2 className="text-sm md:text-base font-bold tracking-tight">Work Experience</h2>
      </div>
      <div className="pt-2 md:pl-[46px] md:pt-0 flex flex-col gap-4">
        <p className="text-sm md:text-base font-normal text-accent-foreground leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of experience specializing in scalable frontend and backend development for fintech products.
        </p>
        <div className="border border-neutral-300 rounded-lg px-2 py-3 md:px-3 md:py-4 flex flex-col gap-4">
          <div className="flex items-start gap-2.5">
            <Image
              src="/logos/dipayindonesia_logo.webp"
              width={40}
              height={40}
              alt=""
              className="border border-neutral-100 overflow-hidden rounded-full"
            />
            <div>
              <h4 className="text-base font-semibold tracking-tight">Dipay Indonesia</h4>
              <p className="text-xs md:text-sm mt-0.5 font-normal text-accent-foreground inline-flex items-center">
                <span>Full-time</span>
                <Dot className="text-slate-400" />
                <span>3yrs 2mos</span>
              </p>
              <p className="text-xs md:text-sm font-normal text-muted-foreground">
                Jakarta, Indonesia - On-site
              </p>
            </div>
          </div>
          <div className="pl-4">
            <Timeline>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon />
                  <TimelineTitle>Full Stack Engineer</TimelineTitle>
                </TimelineHeader>
                <TimelineContent className="pr-0">
                  <TimelineDate className="flex items-center">
                    <span>Jul 2024 - Present</span>
                    <Dot className="text-slate-400" />
                    <span>5mos</span>
                  </TimelineDate>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineHeader>
                  <TimelineIcon />
                  <TimelineTitle>Frontend Engineer</TimelineTitle>
                </TimelineHeader>
                <TimelineContent className="pr-0">
                  <TimelineDate className="flex items-center">
                    <span>Oct 2021 - Jul 2024</span>
                    <Dot className="text-slate-400" />
                    <span>2yrs 10mos</span>
                  </TimelineDate>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  )
}