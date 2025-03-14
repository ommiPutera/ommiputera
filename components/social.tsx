import { ContentLink, ContentParagraph } from "./content";

export default function Social() {
  return (
    <ContentParagraph>
      <span>You can also find me on</span>{" "}
      <span className="inline-flex gap-1">
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
          href="https://twitter.com/Omiputera1/"
          target="_blank"
          text="X (Twitter)"
        />
      </span>
    </ContentParagraph>
  );
}
