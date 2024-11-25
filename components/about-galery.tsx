import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

export default function AboutGalery() {
  return (
    <Carousel>
      <CarouselContent overflowVisible className="-ml-2">
        {[
          "ommi-original.webp",
          "my-laptop.webp",
          "teams-work.webp",
          "beach.jpg",
          "me.webp",
        ].map((image) => (
          <CarouselItem
            className="pl-2 overflow-hidden rounded-xl max-h-[400px] max-w-[400px]"
            key={image}
          >
            <Image
              src={`/images/${image}`}
              width={400}
              height={400}
              alt=""
              className="border border-neutral-100 dark:border-neutral-800 object-cover overflow-hidden rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
