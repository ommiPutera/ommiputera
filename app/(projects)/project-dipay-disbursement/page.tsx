import Image from "next/image";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

export default function ProjectDipayDisbursement() {
  return (
    <ShellPage withHome withBack>
      <Section className="p-0 md:p-0">
        <Image
          src="/images/projects/dipay-disburesment.jpeg"
          width={600}
          height={600}
          alt=""
          className="object-contain overflow-hidden h-full w-full"
        />
      </Section>
      <Section className="p-0 md:p-0">
        <div className="p-9 md:p-0 max-w-[422px] md:my-12 md:mx-auto group">
          <p className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold">
            Dipay Indonesia - 2024
          </p>
          <h2 className="text-xl font-extrabold w-full my-4 leading-7">
            Building a Dipay Enterprise Disbursement
          </h2>
          <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-neutral-300 inline-flex flex-col gap-2 prose dark:prose-invert">
            Improve the accuracy and efficiency of image recognition technology.
            By creating our own tools, we can customize the annotation process
            to fit the specific needs and requirements, rather than relying on
            third-party tools.
          </p>
        </div>
      </Section>
    </ShellPage>
  );
}
