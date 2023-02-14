// describes a command that can be invoked from the command line
import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

interface LocalApiError {
  code: string;
}

// what kind of command to hear
// whenever it runs, the action will run
// [filename] => optional value, we need a default, look "option"
// <> => required value
// [] => optional value

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      // if we are in production, and isProduction is true, we push !isProduction
      // which is false, which means that we will not use a Proxy (as we are not developing)
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(`Server is running on port ${options.port}`);

      // options is for example
      // options: {port: "4005"}
    } catch (error) {
      const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === "string";
      };

      if (isLocalApiError(error)) {
        if (error.code === "EADDRINUSE") {
          console.error("Port is in use. Try running on a different port.");
        }
      } else if (error instanceof Error) {
        console.log("Heres the problem", error.message);
      }
      process.exit(1);
    }
  });
