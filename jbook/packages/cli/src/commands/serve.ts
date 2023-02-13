// describes a command that can be invoked from the command line
import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

// what kind of command to hear
// whenever it runs, the action will run
// [filename] => optional value, we need a default, look "option"
// <> => required value
// [] => optional value
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action((filename = "notebook.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), path.basename(filename), dir);
    // options is for example
    // options: {port: "4005"}
  });
