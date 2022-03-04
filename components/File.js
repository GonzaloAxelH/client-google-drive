import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
const WrapperFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;
  p {
    max-width: 80px;

    text-align: center;
    font-size: 13px;
    font-family: sans-serif;
    font-weight: bold;
  }
`;

export default function Filea({ name }) {
  const [extFile, setExtFile] = useState("");
  useEffect(() => {
    const extension = name.split(".");

    setExtFile(extension[extension.length - 1]);
  }, [name]);
  return (
    <WrapperFile>
      <Image src={`/fileexe.png`} width={100} height={100} />
      <p>{name}</p>
    </WrapperFile>
  );
}
