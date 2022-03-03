import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import Folder from "../../components/Folder";
import File from "../../components/File";
const DirectoryRoot = (props) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setFiles(props.data.content);
  }, [props.data]);

  return !files.length == 0 ? (
    <div>
      {files.map((el, i) => {
        if (isFile(el)) {
          return <File key={i} name={el} />;
        } else {
          return <Folder key={i} name={el} to={`root/${el}`} />;
        }
      })}
      <Form destino={props.data.pathEnviado} />
    </div>
  ) : (
    <h1>Vacio</h1>
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
