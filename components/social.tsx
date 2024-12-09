import { ContentLink, ContentParagraph } from "./content";

export default function Social() {
  return (
    <ContentParagraph>
      <span>You can follow me on</span>{" "}
      <span className="inline-flex gap-1">
        <ContentLink
          href="https://twitter.com/Omiputera1/"
          target="_blank"
          text="Twitter,"
        />
        <ContentLink
          href="https://www.linkedin.com/in/ommiputera/"
          target="_blank"
          text="LinkedIn,"
        />
        <ContentLink
          href="https://github.com/ommiPutera/"
          target="_blank"
          text="Github,"
        />
        <ContentLink
          href="https://www.instagram.com/omiputera/"
          target="_blank"
          text="Instagram"
        />
      </span>
    </ContentParagraph>
  );
}
