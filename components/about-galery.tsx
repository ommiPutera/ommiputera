import Image from "next/image";

import { getBase64Image } from "~/utils/getImageBlur";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

type TGalery = {
  path: string;
  caption: string;
  alt: string;
};

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
      path: "teams.jpg",
      caption: "",
      alt: "Picture of me with the engineering and product team",
    },
    {
      path: "me-card.webp",
      caption: "",
      alt: "",
    },
    {
      path: "beach.jpg",
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
    <Carousel
      opts={{ loop: false, skipSnaps: true, containScroll: "trimSnaps" }}
    >
      <CarouselContent overflowVisible className="-ml-1">
        {images.map((image, index) => (
          <CarouselItem
            className="pl-1 overflow-hidden rounded-xl max-h-[500px] max-w-[450px]"
            key={image.path}
          >
            <Image
              alt={image.alt}
              src={`/images/${image.path}`}
              width={1000}
              height={1000}
              priority
              placeholder="blur"
              blurDataURL={blurredImages[index]}
              className="border border-neutral-200 dark:border-neutral-700 object-cover overflow-hidden rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
