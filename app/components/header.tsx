import styled from "styled-components";
import { H1 } from "./typography";

function Header() {
  return (
    <Container className="container__header">
      <H1>Header</H1>
    </Container>
  );
}

const Container = styled.section`
  background: #202124;
  padding: 40px 0;
`;

export { Header };
