import { Mail, MonitorSmartphone, Smartphone } from "lucide-react";

import Link from "next/link";

import Br from "~/components/br";
import Content from "~/components/content";
import Section from "~/components/section";
import Title from "~/components/title";

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
          love to hear your thoughts.
        </p>
      </Content>
      <Br />
      <Content>
        <div className="flex items-center gap-2 mt-1">
          <Link
            href="mailto:omiputrakarunia@gmail.com"
            target="_blank"
            className="block border w-fit border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-1.5">
              <div>
                <Mail className="w-5 h-5" />
              </div>
              <p className="text-xs md:text-sm font-medium text-accent-foreground leading-5">
                Email me
              </p>
            </div>
          </Link>
          <Link
            href="mailto:omiputrakarunia@gmail.com"
            target="_blank"
            className="block border w-fit border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-1.5">
              <div>
                <Smartphone className="w-5 h-5" />
              </div>
              <p className="text-xs md:text-sm font-medium text-accent-foreground leading-5">
                WhatsApp me
              </p>
            </div>
          </Link>
        </div>
      </Content>
    </Section>
  );
}
