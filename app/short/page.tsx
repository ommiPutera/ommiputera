import Link from "next/link";

import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";
import { DropdownMenuSeparator } from "~/components/ui/dropdown-menu";

import { getShortPosts, Metadata } from "~/data/short";

import { cn, formatDate } from "~/lib/utils";

export const metadata = {
  title: "The Ommi Putera Short",
};

export default async function ShortPage() {
  const posts = await getShortPosts();

  const shorts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
  return (
    <ShellPage withBack title="Short">
      <Section>
        <div className="overflow-hidden relative m-4 md:mb-0 md:p-6 md:rounded-xl flex justify-between items-start md:mt-0 max-w-lg md:mx-auto">
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="relative z-10 text-lg md:text-2xl font-bold">
              Short
            </h1>
            <SvgSpin width="40px" height="40px" viewBox="0 0 20 20">
              <path
                fill="#555"
                fillRule="evenodd"
                d="M11,16 C12.1045695,16 13,16.8954305 13,18 C13,19.1045695 12.1045695,20 11,20 C9.8954305,20 9,19.1045695 9,18 C9,16.8954305 9.8954305,16 11,16 Z M4.74123945,13 C6.12195133,13 7.24123945,14.1192881 7.24123945,15.5 C7.24123945,16.8807119 6.12195133,18 4.74123945,18 C3.36052758,18 2.24123945,16.8807119 2.24123945,15.5 C2.24123945,14.1192881 3.36052758,13 4.74123945,13 Z M16.3193286,13.5 C17.4238981,13.5 18.3193286,14.3954305 18.3193286,15.5 C18.3193286,16.6045695 17.4238981,17.5 16.3193286,17.5 C15.2147591,17.5 14.3193286,16.6045695 14.3193286,15.5 C14.3193286,14.3954305 15.2147591,13.5 16.3193286,13.5 Z M18.5,9.31854099 C19.3284271,9.31854099 20,9.99011387 20,10.818541 C20,11.6469681 19.3284271,12.318541 18.5,12.318541 C17.6715729,12.318541 17,11.6469681 17,10.818541 C17,9.99011387 17.6715729,9.31854099 18.5,9.31854099 Z M2.5,6 C3.88071187,6 5,7.11928813 5,8.5 C5,9.88071187 3.88071187,11 2.5,11 C1.11928813,11 0,9.88071187 0,8.5 C0,7.11928813 1.11928813,6 2.5,6 Z M17.7857894,5.20724734 C18.3380741,5.20724734 18.7857894,5.65496259 18.7857894,6.20724734 C18.7857894,6.75953209 18.3380741,7.20724734 17.7857894,7.20724734 C17.2335046,7.20724734 16.7857894,6.75953209 16.7857894,6.20724734 C16.7857894,5.65496259 17.2335046,5.20724734 17.7857894,5.20724734 Z M8,0 C9.65685425,0 11,1.34314575 11,3 C11,4.65685425 9.65685425,6 8,6 C6.34314575,6 5,4.65685425 5,3 C5,1.34314575 6.34314575,0 8,0 Z M15.5,3 C15.7761424,3 16,3.22385763 16,3.5 C16,3.77614237 15.7761424,4 15.5,4 C15.2238576,4 15,3.77614237 15,3.5 C15,3.22385763 15.2238576,3 15.5,3 Z"
              />
            </SvgSpin>
            <SvgSpin width="40px" height="40px" viewBox="0 0 24 24">
              <path
                id="primary"
                d="M17,6V3a1,1,0,0,0-1-1H8A1,1,0,0,0,7,3V6a7,7,0,0,0,2.8,5.6l.53.4-.53.4A7,7,0,0,0,7,18v3a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V18a7,7,0,0,0-2.8-5.6l-.53-.4.53-.4A7.05,7.05,0,0,0,17,6Z"
                style={{
                  fill: "rgb(0, 0, 0)",
                }}
              />
              <path
                id="secondary"
                d="M18,22H6a1,1,0,0,1,0-2H18a1,1,0,0,1,0,2ZM18,4H6A1,1,0,0,1,6,2H18a1,1,0,0,1,0,2Z"
                style={{
                  fill: "rgb(44, 169, 188)",
                }}
              />
            </SvgSpin>
            <SvgSpin width="40px" height="40px" viewBox="0 0 24 24">
              <path
                d="M12 1V5"
                stroke="#DF1463"
                strokeWidth={1.7}
                strokeLinecap="round"
              />
              <path
                d="M19.4246 18.9246L16.5961 16.0962"
                stroke="#1C1C1C"
                strokeWidth={1.7}
                strokeLinecap="round"
              />
              <path
                d="M22.5 11.5L18.5 11.5"
                stroke="#1C1C1C"
                strokeWidth={1.7}
                strokeLinecap="round"
              />
              <path
                d="M12 18V22"
                stroke="#1C1C1C"
                strokeWidth={1.7}
                strokeLinecap="round"
              />
              <path
                d="M7.40381 6.90381L4.57538 4.07538"
                stroke="#1C1C1C"
                strokeWidth={1.7}
                strokeLinecap="round"
              />
              <path
                d="M5.5 11.5L1.5 11.5"
                stroke="#1C1C1C"
                strokeWidth={1.7}
                strokeLinecap="round"
              />
              <path
                d="M7.40381 16.0962L4.57538 18.9246"
                stroke="#1C1C1C"
                strokeWidth={1.7}
                strokeLinecap="round"
              />
            </SvgSpin>
            <ContentParagraph className="text-sm mt-2 md:max-w-72">
              This is a collection of short notes of the things I have learned
              on the daily.
            </ContentParagraph>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="mt-8 md:mt-6 mb-4 md:mb-0">
          {shorts.map((post) => {
            const slug = post.slug;
            const source = post.source;
            return (
              <Short
                key={post.slug}
                source={source}
                slug={slug}
                {...(post.metadata as Metadata)}
              />
            );
          })}
        </div>
      </Section>
    </ShellPage>
  );
}

async function Short({
  slug,
  publishedAt,
  title,
}: {
  slug: string;
  source: string;
  id?: string;
} & Metadata) {
  return (
    <Link href={`/short/${slug}`} prefetch>
      <div className="px-4 py-6 md:px-6 rounded-xl border hover:bg-neutral-100 dark:hover:bg-neutral-800">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {formatDate(publishedAt)}
        </p>
        <p className="text-sm font-bold mt-1">{title}</p>
      </div>
    </Link>
  );
}

function SvgSpin({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={cn("animate-spin", className)}
      {...props}
    >
      {props.children ? (
        props.children
      ) : (
        <g fill="#000000" fillRule="evenodd" clipRule="evenodd">
          <path
            d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
            opacity={0.2}
          />
          <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
        </g>
      )}
    </svg>
  );
}
