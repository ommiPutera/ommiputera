"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChevronLeft, Mail, Signpost } from "lucide-react";

import Br from "~/components/br";
import Content, { ContentParagraph } from "~/components/content";
import Section from "~/components/section";

export default function NextTo() {
  const router = useRouter();
  return (
    <Section className="pt-0 md:pt-0 mb-6">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Signpost className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Next">
        <ContentParagraph>Where to from here?</ContentParagraph>
        <Br />
        <ContentParagraph>
          Explore more about my work, values, and journey. Navigate to another
          page to dive deeper!
        </ContentParagraph>
        <Br />
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/blog"
            className="block border w-full text-center border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <p className="text-xs md:text-sm font-medium">Blog</p>
          </Link>
          <Link
            href="/projects"
            className="block border w-full text-center border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <p className="text-xs md:text-sm font-medium">Projects</p>
          </Link>
          <Link
            href="mailto:omiputrakarunia@gmail.com"
            target="_blank"
            className="block border w-full text-center border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <div className="flex items-center justify-center gap-1.5">
              <div>
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-xs md:text-sm font-medium">Email me</p>
            </div>
          </Link>
          <button
            onClick={() => router.back()}
            className="block border w-full text-center border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <div className="flex items-center justify-center gap-1.5">
              <div>
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-xs md:text-sm font-medium">Back</p>
            </div>
          </button>
        </div>
      </Content>
    </Section>
  );
}
