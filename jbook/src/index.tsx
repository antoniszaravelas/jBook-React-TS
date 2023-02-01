import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import CodeEditor from "./components/code-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "./components/preview";
import bundle from "./bundler";

/*
the problem with esbuild, is that it needs to bundle the modules with eachother
which are locally on the file system, but also the modules that I import as npm 
packages. This cannot be done in the browser, because the browser has no access
to the file system. So we have to do it in another way:

we need to fetch (intercept) when the esbuild bundler sees for example that we have
import react from "react", we need to fetch the source code of react and provide it to the 
ESBUILD Bundler, so it can bundle it with the rest of our application in the browser

npm view react(or any other package) dist.tarball => this will give me the source code
of the XXX package that I have written. 
*/

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <>
      <CodeEditor
        onChange={(value) => setInput(value)}
        initialValue="const a =1"
      />
      <br />
      <button style={{ display: "block" }} onClick={onClick}>
        Submit
      </button>
      <Preview code={code} />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
