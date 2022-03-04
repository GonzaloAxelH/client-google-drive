import React from "react";
import styled from "styled-components";
import Form from "./Form";

const WrapperHeader = styled.div`
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3em;
`;

const Logo = styled.h1``;
export default function Header({ pathActual }) {
  return (
    <WrapperHeader>
      <Logo>Logo</Logo>
      <Form destino={pathActual} />
    </WrapperHeader>
  );
}
