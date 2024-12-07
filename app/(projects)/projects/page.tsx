import { MoveRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

import Br from "~/components/br";
import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";
import { BackgroundBeams } from "~/components/ui/background-beams";

export const metadata = {
  title: "The Ommi Putera Projects",
  description: "",
};

const data: TData[] = [
  // {
  //   slug: "dipay-disbursement",
  //   imageSource: "/images/projects/dipay-disburesment.jpeg",
  //   title: "Building a Dipay Enterprise Disbursement",
  //   summary:
  //     "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  // },
  // {
  //   slug: "dipay-core-dashboard",
  //   imageSource: "/images/projects/dipay-core.jpeg",
  //   title: "Building a Dipay Core Dashboard",
  //   summary:
  //     "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  // },
  {
    slug: "dipay-landing",
    imageSource: "/images/projects/personal-page.jpeg",
    title: "Revamped a Landing Page using Next.js",
    summary:
      "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  },
  {
    slug: "naufal-website",
    imageSource: "/images/projects/naufal-page.jpeg",
    title: "Personal/Porfolio Website for Naufal Ghifari",
    summary:
      "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  },
];
type TData = {
  slug: string;
  imageSource: string;
  title: string;
  summary: string;
};

export default async function ProjectsPage() {
  return (
    <ShellPage title="The Ommi Putera Projects" withHome withBack>
      <Section>
        <div className="my-4">
          <h1 className="relative z-10 text-2xl md:text-4xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300  text-center font-sans font-bold">
            Curated Projects
          </h1>
          <ContentParagraph className="text-center text-base mx-12 md:mx-24 mt-1">
            Showcase of my latest projects. They&apos;re sure to catch your eye!
          </ContentParagraph>
        </div>
        <Br />
        <div className="flex flex-col gap-6 md:gap-8">
          {data.map((post) => {
            const slug = post.slug;
            const imageSource = post.imageSource;
            const title = post.title;
            const summary = post.summary;
            const props = {
              imageSource,
              slug,
              title,
              summary,
            };
            return <Project key={post.slug} {...props} />;
          })}
        </div>
        <Br />
      </Section>
    </ShellPage>
  );
}

function Project({ slug, imageSource, title, summary }: TData) {
  return (
    <Link
      href={`/${slug}`}
      prefetch
      className="rounded-xl w-full cursor-pointer block h-full overflow-hidden bg-background border dark:border-neutral-800"
    >
      <Image
        src={imageSource}
        width={800}
        height={400}
        alt=""
        className="h-full min-h-[248px] md:h-[340px] object-cover"
      />
      <div className="p-9 md:p-0 max-w-[422px] md:my-12 md:mx-auto group">
        <p className="text-blue-500 text-xs md:text-sm font-semibold">2024</p>
        <h3 className="text-xl font-extrabold w-full my-4 leading-7">
          {title}
        </h3>
        <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-neutral-300 inline-flex flex-col gap-2 prose dark:prose-invert">
          {summary}
        </p>
        <br />
        <br />
        <p className="text-xs font-semibold inline-flex gap-4 items-center group-hover:text-blue-500">
          <span>View</span>
          <MoveRight className="w-4 h-4" />
        </p>
      </div>
    </Link>
  );
}

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}
