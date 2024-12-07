import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { DirectionAwareHover } from "~/components/ui/direction-aware-hover";

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
            caption: "I love the vibe of nature.",
          },
        ].map((image) => (
          <CarouselItem
            className="pl-1.5 md:pl-2 overflow-hidden rounded-xl max-h-[400px] max-w-[400px]"
            key={image.path}
          >
            {image.caption ? (
              <DirectionAwareHover
                imageUrl={`/images/${image.path}`}
                imageClassName="border border-neutral-200 dark:border-neutral-700 object-cover overflow-hidden rounded-xl"
              >
                <p className="font-extrabold text-lg text-neutral-50 leading-none max-w-[200px]">
                  {image.caption}
                </p>
              </DirectionAwareHover>
            ) : (
              <Image
                src={`/images/${image.path}`}
                width={400}
                height={400}
                alt=""
                blurDataURL=""
                className="border border-neutral-200 dark:border-neutral-700 object-cover overflow-hidden rounded-xl"
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
