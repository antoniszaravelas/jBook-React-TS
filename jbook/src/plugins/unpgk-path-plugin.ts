import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";
// localForage is using indexedDB, much more space than LocalStorage

const fileCache = localForage.createInstance({
  name: "fileCache",
});

// a plug-in for ESBUILD (other plug-ins can be used for other bundlers)
// ESBUILD more streamlined than Webpack (which means that not many lines of code)
// and helper functions are needed to create the bundle

export const unpkgPathPlugin = (codeToBeBundled: string) => {
  return {
    // name: for debugging purposes, in case you have more plug-ins working inside the project
    name: "unpkg-path-plugin",
    // setup function: is going to be called automatically by ESBUILD with the argument build
    setup(build: esbuild.PluginBuild) {
      // build: shows the bundling process
      // this filter shows when something is executed and when something is not, depending
      // on what kind of file I want to load
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        // namespace is used same as filter. only to files that have a namespace of "a"
        // based on onResolve and onLoad. If I give in the onLoad a second argument with
        // {namespace: b} it will not align with the onResolve which has the "a" and the code will break
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        return {
          namespace: "a",
          path:
            args.path.includes("./") || args.path.includes("../")
              ? new URL(args.path, `https://www.unpkg.com${args.resolveDir}/`)
                  .href
              : `https://www.unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        if (args.path === "index.js") {
          // dont let it load the index.js, just return what I want (normally it would return what it finds)
          return {
            loader: "jsx",
            contents: codeToBeBundled,
          };
        }
        // <> this on TS describes what kind of thing will be returned
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) return cachedResult;

        const { data, request } = await axios.get(args.path);

        // resolveDir will be provided to the next import that we will need to do
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // time to cache the source code because it is not in the indexedDB
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
