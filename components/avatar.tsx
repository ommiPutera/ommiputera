// import Image from "next/image";

// import { getBase64Image } from "~/utils/getImageBlur";

import { SectionAvatar } from "./section";

export async function OmmiAvatar() {
  return (
    <SectionAvatar>
      <span className="font-semibold text-sm">OP</span>
      {/* <Image
        src="/images/profile.jpeg"
        width={40}
        height={40}
        alt=""
        placeholder="blur"
        blurDataURL={await getBase64Image("/images/projects/personal.png")}
        className="object-cover overflow-hidden rounded-full"
      /> */}
    </SectionAvatar>
  );
}
