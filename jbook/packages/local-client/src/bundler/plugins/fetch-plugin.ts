import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

// localForage is using indexedDB, much more space than LocalStorage
const fileCache = localForage.createInstance({
  name: "fileCache",
});

export const fetchPlugin = (codeToBeBundled: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // only for index.js
      build.onLoad({ filter: /(^index\.js$)/ }, async () => {
        return {
          loader: "jsx",
          contents: codeToBeBundled,
        };
      });

      // It can return null, no worries. It will continue to other onLoads :)
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // <> this on TS describes what kind of thing will be returned
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) return cachedResult;
        return null;
      });

      //   only for css for example import 'bulma/css/bulma.css'
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        // escaped becasue '${data}' contains ' inside which cannot be escaped
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
  const style = document.createElement('style');
  style.innerText = '${escaped}'
  document.head.appendChild(style)
  `;
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // time to cache the source code because it is not in the indexedDB
        await fileCache.setItem(args.path, result);
        return result;
      });

      //   for any other cases
      build.onLoad({ filter: /.*/ }, async (args: any) => {
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
