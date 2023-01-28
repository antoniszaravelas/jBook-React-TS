import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

const App = () => {
  const ref = useRef<any>();
  const ref2 = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  //   actual initialisation
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
      //   the URL says: go to public directory, find the file /esbuild.wasm
    });
  };

  useEffect(() => {
    startService();
    // returns object that contains transform, build
    // transform : it does transpiling
    // build: for bundling
  }, []);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // ref.current contains what the function esbuild.startService returns, so the object with transform etc
    // you can use a ref to keep a reference to any JS value inside of a component :o
    if (!ref.current) return;
    else console.log(ref.current);
  };

  return (
    <>
      <h1>Type code here:</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <br />
      <button onClick={onClick}>Submit</button>
      <pre>{code}</pre>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
