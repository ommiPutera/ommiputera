import Image from "next/image";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

export default function ProjectDipayDisbursement() {
  return (
    <ShellPage title="Dipay Disbursement" withHome withBack>
      <Section className="p-0 md:p-0">
        <Image
          src="/images/projects/dipay-disburesment.jpeg"
          width={600}
          height={600}
          alt=""
          className="object-contain overflow-hidden h-full w-full"
        />
      </Section>
      <Section className="prose dark:prose-invert">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
          Development of Dipay Disbursement
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 font-normal">
          Improve the accuracy and efficiency of image recognition technology.
          By creating our own tools, we can customize the annotation process to
          fit the specific needs and requirements, rather than relying on
          third-party tools.
        </p>
      </Section>
    </ShellPage>
  );
}
