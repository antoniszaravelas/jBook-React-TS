import * as esbuild from "esbuild-wasm";

// a plug-in for ESBUILD (other plug-ins can be used for other bundlers)
// ESBUILD more streamlined than Webpack (which means that not many lines of code)
// and helper functions are needed to create the bundle

export const unpkgPathPlugin = () => {
  return {
    // name: for debugging purposes, in case you have more plug-ins working inside the project
    name: "unpkg-path-plugin",
    // setup function: is going to be called automatically by ESBUILD with the argument build
    setup(build: esbuild.PluginBuild) {
      // build: shows the bundling process
      //
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        return { path: args.path, namespace: "a" };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        if (args.path === "index.js") {
          // dont let it load the index.js, just return what I want (normally it would return what it finds)
          return {
            loader: "jsx",
            contents: `
		import message from './message';
		console.log(message);
		`,
          };
        } else {
          // lol, if steps 1,2 need to be repeated, instead of searching for "/messages.tsx"
          // or anything, just return this thingy here
          return {
            loader: "jsx",
            contents: 'export default "hi there!"',
          };
        }
      });
    },
  };
};
