import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export const getBase64Image = async (imgPath: string) => {
  try {
    const file = await fs.readFile(`public/${imgPath}`);
    const { base64 } = await getPlaiceholder(file);
    return base64;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    else if (error && typeof error === "object" && "message" in error)
      return error.message as string;
    else if (typeof error === "string") return error;
    else return "Unexpected error!";
  }
};

export const getBase64RemoteImage = async (imgSrc: string) => {
  try {
    const src = imgSrc;
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (err) {
    console.log(err);
    return "";
  }
};
