import React from "react";
import Link from "next/link";
export default function Folder({ name, to }) {
  return (
    <Link href={to}>
      <a>
        <button>{name}</button>
      </a>
    </Link>
  );
}
