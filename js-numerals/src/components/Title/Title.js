import React from "react";
import styled from "styled-components";

const TitleStyle = styled.h1`
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  color: rgba(72, 201, 176, 1);
`;
function Title({ title }) {
  return <TitleStyle>{title}</TitleStyle>;
}

export default Title;
