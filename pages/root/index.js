import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Folder from "../../components/Folder";
import File from "../../components/File";
import Layout from "../Layout";
const WrapperDirectory = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2em;
`;
const DirectoryRoot = (props) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setFiles(props.data.content);
  }, [props.data]);

  return !files.length == 0 ? (
    <Layout pathActual={props.data.path.name}>
      <WrapperDirectory>
        {files.map((el, i) => {
          if (isFile(el)) {
            return <File key={i} name={el} />;
          } else {
            return <Folder key={i} name={el} to={`root/${el}`} />;
          }
        })}
      </WrapperDirectory>
    </Layout>
  ) : (
    <Layout pathActual={props.data.path.name}>
      <h1>Vacio</h1>
    </Layout>
  );
};

function isFile(name) {
  return name.includes(".");
}

DirectoryRoot.getInitialProps = async (context) => {
  const pathFormat = "";
  return postData("http://localhost:5000/api/root", {
    pathactual: { name: "" },
  })
    .then((data) => {
      return { data: data, pathEnviado: pathFormat };
    })
    .catch((err) => {
      return { message: "Path invalido" };
    });
};

// Ejemplo implementando el metodo POST:
async function postData(url = "", data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export default DirectoryRoot;
