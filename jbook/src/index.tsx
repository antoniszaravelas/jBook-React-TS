import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpgk-path-plugin";

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

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // ref.current contains what the function esbuild.startService returns, so the object with transform etc
    // you can use a ref to keep a reference to any JS value inside of a component :o
    if (!ref.current) return;
    const result = await ref.current.build({
      // means the index.js file is the first to be bundled, bundle it!
      // 1. where is index.js? (onResolve step (see unpgk-path-plugin.ts))
      // 2. load up the index.js file (onLoad step)
      // 3. parse the index.js, find any import / require / exports
      // 4. if you found imports/require/exports  , repeat steps 1 and 2
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
    });

    console.log(result);
    setCode(result.outputFiles[0].text);
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
