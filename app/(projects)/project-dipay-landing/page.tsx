// import Image from "next/image";
// import Section from "~/components/section";
// import ShellPage from "~/components/shell-page";

import { HomeIcon, NewspaperIcon, TerminalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";

// import { BackBtn } from "~/components/shell-page";
import { FloatingDock } from "~/components/ui/floating-dock";

import { getBase64Image } from "~/utils/getImageBlur";

export default async function ProjectDipayDisbursement() {
  return (
    <ProjectShell>
      <Container>
        <div className="text-center">
          <h2 className="text-3xl leading-8 sm:leading-normal sm:text-4xl lg:text-5xl font-extrabold w-full my-4">
            Revamped a Landing Page using Next.js
          </h2>
          <p className="text-sm md:text-lg font-medium text-neutral-700 dark:text-neutral-200">
            I revamped the Dipay landing page using Next.js, implementing SEO
            best practices to enhance visibility while delivering a modern,
            high-performance design that reduced load times and boosted user
            engagement. 🚀
          </p>
        </div>
      </Container>
      <FullContainer>
        <div className="md:bg-neutral-300/30 backdrop-blur-sm md:dark:bg-neutral-800/30 md:py-14">
          <Image
            src="/images/projects/personal.png"
            width={1000}
            height={1000}
            alt=""
            placeholder="blur"
            blurDataURL={await getBase64Image("/images/projects/personal.png")}
            className="object-cover rounded-xl h-full max-h-[600px] mx-auto border border-neutral-200"
          />
        </div>
      </FullContainer>
      <Container>
        <div>
          <p className="text-sm md:text-lg font-medium text-neutral-700 dark:text-neutral-200">
            I revamped the Dipay landing page using Next.js, implementing SEO
            best practices to enhance visibility while delivering a modern,
            high-performance design that reduced load times and boosted user
            engagement. 🚀
          </p>
        </div>
      </Container>
    </ProjectShell>
  );
}

function ProjectShell({ children }: { children: React.ReactNode }) {
  const links = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <TerminalIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <NewspaperIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="mt-6 md:mt-12">
      <div className="flex flex-col relative">
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
          <FloatingDock
            mobileClassName="" // only for demo, remove for production
            items={links}
          />
        </div>
        <header role="banner">
          <h1 className="text-sm font-medium underline text-center">
            <Link href="/" className="text-blue-600 dark:text-blue-400">
              Ommi Putera
            </Link>
          </h1>
        </header>
        <main role="main" className="relative overflow-hidden">
          <div className="min-h-screen relative p-2 md:p-0 flex flex-col gap-6 md:gap-14">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="px-7 mx-auto max-w-screen-sm">{children}</div>;
}

function FullContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full">{children}</div>;
}
