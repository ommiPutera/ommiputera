import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";

import React from "react";

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
const AnchorOrLink = React.forwardRef<
  HTMLAnchorElement,
  AnchorProps & {
    reload?: boolean;
    to?: LinkProps["to"];
    prefetch?: LinkProps["prefetch"];
  }
>(function AnchorOrLink(props, ref) {
  let {
    to,
    href,
    download,
    reload = false,
    prefetch,
    children,
    ...rest
  } = props;
  let toUrl = "";
  let shouldUserRegularAnchor = reload || download;

  if (!shouldUserRegularAnchor && typeof href === "string") {
    shouldUserRegularAnchor = href.includes(":") || href.startsWith("#");
  }

  if (!shouldUserRegularAnchor && typeof to === "string") {
    toUrl = to;
    shouldUserRegularAnchor = to.includes(":");
  }

  if (!shouldUserRegularAnchor && typeof to === "object") {
    toUrl = `${to.pathname ?? ""}${to.hash ? `#${to.hash}` : ""}${
      to.search ? `?${to.search}` : ""
    }`;
    shouldUserRegularAnchor = to.pathname?.includes(":");
  }

  if (shouldUserRegularAnchor) {
    return (
      <a {...rest} download={download} href={href ?? toUrl} ref={ref}>
        {children}
      </a>
    );
  } else {
    return (
      <Link prefetch={prefetch} to={to ?? href ?? ""} {...rest} ref={ref}>
        {children}
      </Link>
    );
  }
});

function getRequiredEnvVarFromObj(
  obj: Record<string, string | undefined>,
  key: string,
  devValue: string = `${key}-dev-value`
) {
  let value = devValue;
  const envVal = obj[key];
  if (envVal) {
    value = envVal;
  } else if (obj.NODE_ENV === "production") {
    throw new Error(`${key} is a required env variable`);
  }
  return value;
}

function getRequiredServerEnvVar(key: string, devValue?: string) {
  return getRequiredEnvVarFromObj(process.env, key, devValue);
}

export { AnchorOrLink, getRequiredServerEnvVar };
