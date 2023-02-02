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
      // handle root entry file of "index.js"
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });
      // build: shows the bundling process
      // this filter shows when something is executed and when something is not, depending
      // on what kind of file I want to load

      // in case the path is ./ or ../ (relative path in a module)
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          path: new URL(args.path, `https://www.unpkg.com${args.resolveDir}/`)
            .href,
          namespace: "a",
        };
      });

      // handle in any other case (main file of a module)
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // namespace is used same as filter. only to files that have a namespace of "a"
        // based on onResolve and onLoad. If I give in the onLoad a second argument with
        // {namespace: b} it will not align with the onResolve which has the "a" and the code will break
        return {
          namespace: "a",
          path: `https://www.unpkg.com/${args.path}`,
        };
      });
    },
  };
};
