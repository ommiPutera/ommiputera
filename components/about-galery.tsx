import { getBase64 } from "~/utils/getImageBlur";

import { GaleryCarousel } from "./galery";

export default async function AboutGalery() {
  const images = [
    {
      path: "ommi-original.webp",
      caption: "",
      alt: "Enjoying Jakarta at night",
    },
    {
      path: "my-laptop.webp",
      caption: "My super cozy workspace",
      alt: "My setup",
    },
    {
      path: "teams-work.webp",
      caption: "",
      alt: "Picture of me with the engineering and product team",
    },
    {
      path: "beach.jpg",
      caption:
        "I value life because we are not the only ones who wish to live in this world",
      alt: "A beautiful vibe back home",
    },
  ];
  const blurredImages = await Promise.all(
    images.map((image) => getBase64(`/images/${image.path}`)),
  );
  return <GaleryCarousel images={images} blurredImages={blurredImages} />;
}
