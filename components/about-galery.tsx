import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

export default function AboutGalery() {
  return (
    <Carousel>
      <CarouselContent overflowVisible className="-ml-1.5 md:-ml-2">
        {[
          "ommi-original.webp",
          "my-laptop.webp",
          "teams-work.webp",
          "beach.jpg",
          "me.webp",
        ].map((image) => (
          <CarouselItem
            className="pl-1.5 md:pl-2 overflow-hidden rounded-xl max-h-[400px] max-w-[400px]"
            key={image}
          >
            <Image
              src={`/images/${image}`}
              width={400}
              height={400}
              alt=""
              className="border border-neutral-200 dark:border-neutral-700 object-cover overflow-hidden rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
