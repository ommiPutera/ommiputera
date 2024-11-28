"use client";

import { ChevronLeft, CornerUpRight, Mail, Signpost } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AboutGalery from "~/components/about-galery";
import Br from "~/components/br";
import Content from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

export default function About() {
  return (
    <ShellPage title="About" withHome withBack>
      <div>
        <Me />
        <Values />
        <NextTo />
      </div>
    </ShellPage>
  );
}

function Me() {
  return (
    <Section withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="About">
        <p className="text-sm font-normal leading-5">
          My name is <b>Ommi Putera K.</b>
        </p>
        <Br />
        <p className="text-sm font-normal leading-5">
          I work at <b>Dipay Indonesia</b> as a Full Stack Engineer.
        </p>
        <Br />
        <p className="text-sm font-normal leading-5">
          I am passionate about crafting quality software.
        </p>
        <Br />
        <p className="text-sm font-normal leading-5">
          Born in <b>1998 in Bengkulu, Indonesia</b>.
        </p>
        <Br />
        <p className="text-sm font-normal leading-5">
          I was preparing to start my career after graduating with an economics
          degree when the COVID-19 pandemic hit in late 2019. The widespread
          layoffs across industries made me rethink my career path. Amid this
          uncertainty, I discovered the thriving field of digital technology,
          particularly web development. Determined to seize the opportunity, I
          enrolled in the <b>Purwadhika Digital Technology School&apos;s</b>{" "}
          Full Stack Web and Mobile Development Bootcamp in early 2021.
        </p>
        <Br />
        <p className="text-sm font-normal leading-5">
          During the program, I discovered my true passion for coding and web
          development. It sparked a deep commitment to continuous learning and
          growth as a software engineer.
        </p>
        <Br />
        <AboutGalery />
      </Content>
    </Section>
  );
}

function Values() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content
        title="Values"
        description="The principles that guide my approach to work and life."
      >
        <div className="mt-2">
          <h2 className="text-sm md:text-base font-bold tracking-normal mb-1">
            Continuous Learning
          </h2>
          <p className="text-sm font-normal leading-5">
            An engineer understands that learning never ends. By staying curious
            and embracing new ideas and technologies, I drive personal growth
            and adapt to the ever-changing demands of the industry. This mindset
            fuels innovation and keeps my skills sharp.
          </p>
        </div>
        <Br />
        <div>
          <h2 className="text-sm md:text-base font-bold tracking-normal mb-1">
            Effective Collaboration
          </h2>
          <p className="text-sm font-normal leading-5">
            True collaboration begins with humility. By fostering open
            communication and respecting the contributions of every team member,
            regardless of experience, I help create a supportive and inclusive
            environment where ideas flourish and teams succeed.
          </p>
        </div>
        <Br />
        <div>
          <h2 className="text-sm md:text-base font-bold tracking-normal mb-1">
            Empathy
          </h2>
          <p className="text-sm font-normal leading-5">
            Empathy is the bridge between technology and people. By genuinely
            understanding the needs and perspectives of users and clients, I
            ensure that the products and solutions I develop are meaningful,
            effective, and impactful.
          </p>
        </div>
        <Br />
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image
            src="/images/me.webp"
            width={800}
            height={400}
            alt=""
            className="max-h-[350px] object-cover"
          />
        </div>
        <Br />
        <p className="text-sm font-normal leading-5">
          The best way to get in touch with me is to email{" "}
          <b>me@ommiputera.com</b>
        </p>
        <Br />
        <p className="text-sm leading-5">
          <Link
            href=""
            target="_blank"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            Twitter,{" "}
          </Link>
          <Link
            href=""
            target="_blank"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            LinkedIn,{" "}
          </Link>
          <Link
            href=""
            target="_blank"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            Github,{" "}
          </Link>
          <Link
            href=""
            target="_blank"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            Instagram.
          </Link>
        </p>
      </Content>
    </Section>
  );
}

function NextTo() {
  const router = useRouter();
  return (
    <Section className="pt-0 md:pt-0 mb-6">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Signpost className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Next?">
        <p className="text-sm font-normal leading-5">
          Navigate to another page using this menu.
        </p>
        <Br />
        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="block border w-fit border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <p className="text-xs md:text-sm font-medium whitespace-nowrap leading-5">
              Blog
            </p>
          </Link>
          <Link
            href="mailto:omiputrakarunia@gmail.com"
            target="_blank"
            className="block border w-fit border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-1.5">
              <div>
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-xs md:text-sm font-medium  leading-5">
                Email me
              </p>
            </div>
          </Link>
          <button
            onClick={() => router.back()}
            className="block border w-fit border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-1.5">
              <div>
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-xs md:text-sm font-medium  leading-5">Back</p>
            </div>
          </button>
        </div>
      </Content>
    </Section>
  );
}
