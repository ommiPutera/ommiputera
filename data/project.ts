export const getProjectPosts = () => [
  // {
  //   slug: "project-dipay-disbursement",
  //   imageSource: "/images/projects/dipay-disburesment.jpeg",
  //   title: "Building a Dipay Enterprise Disbursement",
  //   description:
  //     "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  // },
  // {
  //   slug: "project-dipay-core-dashboard",
  //   imageSource: "/images/projects/dipay-core.jpeg",
  //   title: "Building a Dipay Core Dashboard",
  //   description:
  //     "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  // },
  {
    slug: "project-dipay-landing",
    imageSource: "/images/projects/personal.png",
    title: "Revamped a Landing Page using Next.js",
    description:
      "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  },
  {
    slug: "project-naufal-website",
    imageSource: "/images/projects/naufal-page.jpeg",
    title: "Personal/Porfolio Website for Naufal Ghifari",
    description:
      "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  },
];
export type TProjectPosts = {
  slug: string;
  imageSource: string;
  title: string;
  description: string;
};
