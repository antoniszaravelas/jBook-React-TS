import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpgk-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

/*
the problem with esbuild, is that it needs to bundle the modules with eachother
which are locally on the file system, but also the modules that I import as npm 
packages. This cannot be done in the browser, because the browser has no access
to the file system. So we have to do it in another way:

we need to fetch (intercept) when the esbuild bundler sees for example that we have
import react from "react", we need to fetch the source code of react and provide it to the 
ESBUILD Bundler, so it can bundle it with the rest of our application in the browser

npm view react(or any other package) dist.tarball => this will give me the source code
of the XXX package that I have written. x
*/

let service: esbuild.Service;

// whatever code the user wrote in the editor
const bundle = async (rawCode: string) => {
  // here comes the bundle (the service needs to be initiated one time)
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  try {
    const result = await service.build({
      // means the index.js file is the first to be bundled, bundle it!
      // 1. where is index.js? (onResolve step (see unpgk-path-plugin.ts))
      // 2. load up the index.js file (onLoad step)
      // 3. parse the index.js, find any import / require / exports
      // 4. if you found imports/require/exports  , repeat steps 1 and 2
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        // we put ' " otherwise it would have been evaluated as a value 'development'
        // and not string
        global: "window",
      },
    });

    return { code: result.outputFiles[0].text, error: "" };
  } catch (error) {
    if (error instanceof Error) return { code: "", error: error.message };
  }

  return { code: "", error: "" };
};

export default bundle;
