import * as React from "react";
import styled from "styled-components";

type TitleProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

function H1(props: TitleProps) {
  return <H1Style {...props}>{props.children}</H1Style>;
}

const H1Style = styled.h1<TitleProps>`
  font-size: 14px;
  color: ${({ variant }) =>
    variant === "primary" ? "red" : variant === "secondary" ? "blue" : ""};
`;

export { H1 };
