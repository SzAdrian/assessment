import React from "react";
import styled from "styled-components";

const DisplayStyle = styled.div`
  font-family: "Work Sans", sans-serif;
  text-align: justify;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  padding-right: 2rem;
  padding-left: 2rem;
  width: fit-content;
  font-size: 2rem;
  @media screen and (max-width: 350px) {
    padding-right: 0;
    padding-left: 0;
  }
`;
function ResultDisplay({ elementRef }) {
  return (
    <DisplayStyle data-testid="result" ref={elementRef}>
      Enter a Number
    </DisplayStyle>
  );
}

export default ResultDisplay;
