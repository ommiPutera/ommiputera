"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { DirectionAwareHover } from "~/components/ui/direction-aware-hover";

import { cn } from "~/lib/utils";

export default function AboutGalery() {
  return (
    <Carousel>
      <CarouselContent overflowVisible className="-ml-1.5 md:-ml-2">
        {[
          {
            path: "ommi-original.webp",
            caption: "",
          },
          {
            path: "my-laptop.webp",
            caption: "My super cozy workspace.",
          },
          {
            path: "teams-work.webp",
            caption: "",
          },
          {
            path: "beach.jpg",
            caption:
              "I value life because we are not the only ones who wish to live in this world",
          },
        ].map((image) => (
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
                src={`/images/${image.path}`}
                width={1000}
                height={1000}
                alt=""
                blurDataURL=""
                className="border border-neutral-200 dark:border-neutral-700 object-cover overflow-hidden rounded-xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
