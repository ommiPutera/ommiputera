"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { DirectionAwareHover } from "~/components/ui/direction-aware-hover";

import { cn } from "~/lib/utils";

type TGalery = {
  path: string;
  caption: string;
  alt: string;
};
export function GaleryCarousel({
  images,
  blurredImages,
}: {
  images: TGalery[];
  blurredImages: string[];
}) {
  return (
    <Carousel>
      <CarouselContent overflowVisible className="-ml-1.5 md:-ml-2">
        {images.map((image, index) => (
          <CarouselItem
            className="pl-1.5 md:pl-2 overflow-hidden rounded-xl max-h-[500px] max-w-[450px]"
            key={image.path}
          >
            <div
              className={cn("hidden md:block", !image.caption && "md:hidden")}
            >
              <DirectionAwareHover
                imageUrl={`/images/${image.path}`}
                childrenClassName="bottom-6 right-6"
                imageClassName="border border-neutral-200 dark:border-neutral-700 object-cover overflow-hidden rounded-xl"
              >
                <p className="font-extrabold text-lg text-neutral-50 leading-none max-w-[250px]">
                  {image.caption}
                </p>
              </DirectionAwareHover>
            </div>
            <div
              className={cn("block md:hidden", !image.caption && "md:block")}
            >
              <Image
                alt={image.alt}
                src={`/images/${image.path}`}
                width={1000}
                height={1000}
                placeholder="blur"
                blurDataURL={blurredImages[index]}
                className="border border-neutral-200 dark:border-neutral-700 object-cover overflow-hidden rounded-xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
