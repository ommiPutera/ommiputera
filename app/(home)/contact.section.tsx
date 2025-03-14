import { Mail, MonitorSmartphone, Smartphone } from "lucide-react";

import Link from "next/link";

import Br from "~/components/br";
import Content, { ContentParagraph } from "~/components/content";
import Section, { SectionAvatar } from "~/components/section";

export default function Contact() {
  return (
    <Section id="contact">
      <SectionAvatar>
        <MonitorSmartphone className="w-4 h-4 md:w-5 md:h-5" />
      </SectionAvatar>
      <Content title="Contact me">
        <ContentParagraph>
          <span>The best way to reach me is by email at </span>
          <b>omiputrakarunia@gmail.com</b>.
        </ContentParagraph>
        <Br />
        <ContentParagraph>
          I&apos;d love to hear from you about projects, collaborations, or even
          just a friendly chat. ☺️
        </ContentParagraph>
      </Content>
      <Br />
      <div className="ml-[48px]">
        <div className="flex items-center gap-2">
          <Link
            href="mailto:omiputrakarunia@gmail.com"
            target="_blank"
            className="block border w-full border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <div className="flex items-center justify-center gap-1.5">
              <div>
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-xs md:text-sm font-medium whitespace-nowrap">
                Email me
              </p>
            </div>
          </Link>
          <Link
            href="https://wa.me/+6281219603026"
            target="_blank"
            className="block border w-full border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <div className="flex items-center justify-center gap-1.5">
              <div>
                <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-xs md:text-sm font-medium whitespace-nowrap">
                Chat
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Section>
  );
}
