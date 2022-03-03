import React from "react";
import styled from "styled-components";

const WrapperForm = styled.div`
  width: 300px;
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    margin-bottom: 1em;
  }
`;

export default function Form({ destino }) {
  const [file, setFile] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("destino", destino);
    formData.append("file", file);
    fetch("http://localhost:5000/api/upload", {
      method: "post",
      body: formData,
    })
      .then((response) => {
        console.log(response.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <WrapperForm>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">SUBIR ARCHIVOS </label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input type="text" value={destino} disabled />
        <button type="submit">ENVIAR</button>
      </form>
    </WrapperForm>
  );
}

// Ejemplo implementando el metodo POST:
async function postData(url = "", data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}
