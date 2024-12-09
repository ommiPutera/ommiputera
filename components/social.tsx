import { ContentLink, ContentParagraph } from "./content";

export default function Social() {
  return (
    <ContentParagraph>
      <span>You can follow me on</span>{" "}
      <span className="inline-flex gap-1">
        <ContentLink
          href="https://remix.run/"
          target="_blank"
          text="Twitter,"
        />
        <ContentLink
          href="https://remix.run/"
          target="_blank"
          text="LinkedIn,"
        />
        <ContentLink href="https://remix.run/" target="_blank" text="Github," />
        <ContentLink
          href="https://remix.run/"
          target="_blank"
          text="Instagram"
        />
      </span>
    </ContentParagraph>
  );
}
