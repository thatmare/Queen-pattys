// import React from 'react'
// import ReactDOM from 'react-dom/client' // react para navegador (web)

// const root = ReactDOM.createRoot(document.getElementById('root'));

// function Saludar() {
//     return <div>
//         <h1>Este es un componente</h1>
//         <p>Lorem ipsum 123</p>
//     </div>
// }

// root.render(<div>
//     <Saludar></Saludar>
//     </div>)

import * as React from "react";
import ReactDOM from "react-dom/client";
import { Input, chakra } from "@chakra-ui/react";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  const name = "Hola Marissa 😁 ";
  const name2 = "No llores princesa 😭"
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <React.StrictMode>
      <ChakraProvider>
        <Input placeholder="Basic usage" />
        <p>Prueba de render varios componentes</p>
        <h1>{name}</h1>
        <h2>{name2}</h2>
      </ChakraProvider>
    </React.StrictMode>
  );
}

root.render(
  <section>
    <App />
    <App />
  </section>
);
{
  /* // ReactDOM.render(<App />, ReactDOM.createRoot ,document.getElementById('root')); */
}

// root.render(<App></App>);

// export default App
