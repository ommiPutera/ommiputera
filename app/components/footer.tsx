import styled from "styled-components";
import { H1 } from "./typography";

function Footer() {
  return (
    <Container className="container__footer">
      <H1>All rights reserved © Ommi Putera 2022</H1>
    </Container>
  );
}

const Container = styled.section`
  background: #202124;
  padding: 40px 0;
`;

export { Footer };
