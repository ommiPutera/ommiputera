export const getProjectPosts = (): TProject[] => [
  {
    title: "Revamped Dipay Website using Next.js",
    description: "Dipay Indonesia - 2023",
    summary:
      "We recently revamped dipay.id with a focus on performance, scalability, and user experience.",
    slug: "project-dipay-website",
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

export function getSingleProject(slug: string) {
  const projects = getProjectPosts();
  return projects.filter((project) => project.slug === slug)[0];
}

export type TProject = {
  title: string;
  description: string;
  summary: string;
  slug: string;
  coverPath: string;
  href: string;
};
