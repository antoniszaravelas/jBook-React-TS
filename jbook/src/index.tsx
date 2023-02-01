import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpgk-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";

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
  const iframeRef = useRef<any>();
  const [input, setInput] = useState("");

  //   actual initialisation
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
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

    // doesn't matter if the variable has been defined before
    iframeRef.current.srcdoc = html;

    const result = await ref.current.build({
      // means the index.js file is the first to be bundled, bundle it!
      // 1. where is index.js? (onResolve step (see unpgk-path-plugin.ts))
      // 2. load up the index.js file (onLoad step)
      // 3. parse the index.js, find any import / require / exports
      // 4. if you found imports/require/exports  , repeat steps 1 and 2
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        // we put ' " otherwise it would have been evaluated as a value 'development'
        // and not string
        global: "window",
      },
    });
    // contentWindow returns the Window object of an HTMLIFrameElement
    iframeRef.current.contentWindow.postMessage(
      // this is the bundled code
      result.outputFiles[0].text,
      "*"
    );
  };

  const html = `
  <html>
    <head></head>
    <body>
        <div id="root"></div>
        <script>
            window.addEventListener("message", (event)=>{
                try{
                    eval(event.data);
                }catch(e){
                   document.querySelector("#root").innerHTML = '<div>' + e+ '</div>';
                   console.error(e);
                }
            },false)
        </script>
    </body>
  </html>
  `;

  const onCodeChange = (cc: string) => {};

  return (
    <>
      {/* <h1>Type code here:</h1> */}
      {/* <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "400px", height: "150px" }}
      ></textarea> */}

      <CodeEditor
        onChange={(inputCode) => onCodeChange(inputCode)}
        initialValue="const a =1"
      />
      <br />
      <button style={{ display: "block" }} onClick={onClick}>
        Submit
      </button>
      <iframe
        title="codePreview"
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
      ></iframe>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
