import { CornerUpRight } from "lucide-react";
import Image from "next/image";

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
          My name is Ommi Putera K., I work at <b>Dipay Indonesia</b> as a Full
          Stack Engineer. I am passionate about crafting quality software that
          makes a positive impact.
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
          enrolled in the <b>Purwadhika Digital Technology School’s</b> Full
          Stack Web and Mobile Development Bootcamp in early 2021.
        </p>
        <Br />
        <p className="text-sm font-normal leading-5">
          During the program, I discovered my true passion for coding and web
          development. It sparked a deep commitment to continuous learning and
          growth as a software engineer. I aim to contribute to innovative
          projects that drive meaningful change.
        </p>
        <Br />
        <AboutGalery />
      </Content>
    </Section>
  );
}

function Values() {
  return (
    <Section className="pt-0 md:pt-0">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content
        title="Values"
        description="The principles that guide my approach to work and life."
      >
        <div className="mt-2">
          <h2 className="text-sm md:text-base font-bold tracking-normal md:leading-4">
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
          <h2 className="text-sm md:text-base font-bold tracking-normal md:leading-4">
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
          <h2 className="text-sm md:text-base font-bold tracking-normal md:leading-4">
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
      </Content>
    </Section>
  );
}
