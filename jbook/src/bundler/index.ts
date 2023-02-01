import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpgk-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

let service: esbuild.Service;

// whatever code the user wrote in the editor
export default async (rawCode: string) => {
  // here comes the bundle (the service needs to be initiated one time)
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

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

  return result.outputFiles[0].text;
};
