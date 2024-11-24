import { Mail, MonitorSmartphone } from "lucide-react";

import Link from "next/link";

import Br from "~/components/br";
import Content from "~/components/content";
import Section from "~/components/section";
import Title from "~/components/title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

export default function Contact() {
  return (
    <Section>
      <Title text="Contact">
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <MonitorSmartphone className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Would you be interested in working on a project together? I&apos;d
          love to hear your thoughts. You can reach me at...
        </p>
      </Content>
      <Br />
      <Content>
        <Carousel>
          <CarouselContent overflowVisible className="-ml-1.5">
            <CarouselItem className="pl-1.5 rounded-xl max-h-[400px] max-w-[260px]">
              <Link
                href="mailto:omiputrakarunia@gmail.com"
                target="_blank"
                className="block border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-7 bg-neutral-50 dark:bg-neutral-900"
              >
                <div className="flex items-center gap-1.5">
                  <div>
                    <Mail className="w-5 h-5" />
                  </div>
                  <p className="text-xs md:text-sm font-medium text-accent-foreground leading-5">
                    omiputrakarunia@gmail.com
                  </p>
                </div>
              </Link>
            </CarouselItem>
            <CarouselItem className="pl-1.5 rounded-xl max-h-[400px] max-w-[280px]">
              <Link
                href="https://wa.me/+6289508182045"
                target="_blank"
                className="block border border-neutral-200 dark:border-neutral-700 rounded-xl px-6 py-7 bg-neutral-50 dark:bg-neutral-900"
              >
                <p className="text-xs md:text-sm font-medium text-accent-foreground leading-5">
                  🇮🇩 +62 89508182045
                </p>
              </Link>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Content>
    </Section>
  );
}
