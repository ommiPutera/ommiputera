export const getProjectPosts = (): TProject[] => [
  {
    title: "Revamped Dipay Website using Next.js",
    description: "Dipay Indonesia - 2023",
    summary:
      "Enhanced visibility and user engagement through SEO best practices and modern design. 🚀",
    slug: "project-dipay-landing",
    coverPath: "/images/projects/personal.png",
    href: "https://dipay.id/",
  },
  {
    title: "Naufal Ghifari Website",
    description: "Personal/porfolio",
    summary:
      "Transformed creative design into responsive, high-performance platform.",
    slug: "project-naufal-website",
    coverPath: "/images/projects/naufal-page.jpeg",
    href: "https://naufalghfr.vercel.app/",
  },
];

export type TProject = {
  title: string;
  description: string;
  summary: string;
  slug: string;
  coverPath: string;
  href: string;
};
