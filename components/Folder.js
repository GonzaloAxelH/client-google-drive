import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
const WrapperFolder = styled.div`
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

export default function Folder({ name, to }) {
  return (
    <WrapperFolder>
      <Link href={to}>
        <a>
          <Image src={`/folder.png`} width={100} height={100} />
        </a>
      </Link>

      <p>{name}</p>
    </WrapperFolder>
  );
}
