import Image, { StaticImageData } from "next/image";

import { getBase64Image } from "~/utils/getImageBlur";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

import beach from "~/public/images/beach.jpg";
import meCard from "~/public/images/me-card.webp";
import myLaptop from "~/public/images/my-laptop.webp";
import ommiOriginal from "~/public/images/ommi-original.webp";
import teams from "~/public/images/teams.jpg";

type TGalery = {
  path: StaticImageData;
  caption: string;
  alt: string;
};

export default async function AboutGalery() {
  const images = [
    {
      path: ommiOriginal,
      caption: "",
      alt: "Enjoying Jakarta at night",
    },
    {
      path: myLaptop,
      caption: "My super cozy workspace",
      alt: "My setup",
    },
    {
      path: teams,
      caption: "",
      alt: "Picture of me with the engineering and product team",
    },
    {
      path: meCard,
      caption: "",
      alt: "me",
    },
    {
      path: beach,
      caption:
        "I value life because we are not the only ones who wish to live in this world",
      alt: "A beautiful vibe back home",
    },
  ];
  const blurredImages = await Promise.all(
    images.map((image) => getBase64Image(`/images/${image.path}`)),
  );
  return <GaleryCarousel images={images} blurredImages={blurredImages} />;
}

function GaleryCarousel({
  images,
  blurredImages,
}: {
  images: TGalery[];
  blurredImages: string[];
}) {
  return (
    <Carousel opts={{ loop: false, skipSnaps: true }}>
      <CarouselContent overflowVisible className="-ml-1">
        {images.map((image, index) => (
          <CarouselItem
            className="pl-1 overflow-hidden rounded-2xl max-h-[500px] max-w-[450px] cursor-grab"
            key={image.alt}
          >
            <Image
              alt={image.alt}
              src={image.path}
              width={1000}
              height={1000}
              priority
              placeholder="blur"
              blurDataURL={blurredImages[index]}
              className="border border-neutral-200 dark:border-neutral-700 object-cover overflow-hidden rounded-2xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
