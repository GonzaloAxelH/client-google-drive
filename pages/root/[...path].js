import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import File from "../../components/File";
import Folder from "../../components/Folder";
import Form from "../../components/Form";
import styled from "styled-components";
const WrapperDirectory = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2em;
`;
const Main = styled.div``;
const Directory = (props) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setFiles(props.data.content);
    console.log(props.data.path.name);
  }, [props.data]);

  return files.length != 0 ? (
    <Layout pathActual={props.data.path.name}>
      <WrapperDirectory>
        {props.data.content.map((el, i) => {
          const path = props.data.path;
          if (isFile(el)) {
            return <File key={i} name={el} path={path} />;
          } else {
            return <Folder key={i} name={el} to={`${path.name}/${el}`} />;
          }
        })}
      </WrapperDirectory>
    </Layout>
  ) : (
    <Layout pathActual={props.data.path.name}>
      <h1>Directorio vacio</h1>
    </Layout>
  );
};

function isFile(name) {
  return name.includes(".");
}

Directory.getInitialProps = async (context) => {
  const { path } = context.query;
  const pathFormat = formatPathArray(path);

  console.log(pathFormat); // JSON data parsed by `data.json()` call
  return postData("http://localhost:5000/api/root", {
    pathactual: { name: pathFormat },
  })
    .then((data) => {
      return { data: data, pathEnviado: pathFormat };
    })
    .catch((err) => {
      return { message: "Path invalido" };
    });
};

function formatPathArray(arrayPath) {
  const pathFormat = arrayPath.reduce((acc, el) => {
    return (acc = acc + el + "/");
  }, "");
  return pathFormat;
}

// Ejemplo implementando el metodo POST:
async function postData(url = "", data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default Directory;
