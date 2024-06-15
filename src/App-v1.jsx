import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: px;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button onClick={() => alert("I am check in")}>Check in</Button>
              <Button
                variations="secondary"
                size="small"
                onClick={() => alert("I am check out")}
              >
                Check out
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guest" />
              <Input type="number" placeholder="Number of guest" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
