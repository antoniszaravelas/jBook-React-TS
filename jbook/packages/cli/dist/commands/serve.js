"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
// describes a command that can be invoked from the command line
const commander_1 = require("commander");
const local_api_1 = require("local-api");
const path_1 = __importDefault(require("path"));
// what kind of command to hear
// whenever it runs, the action will run
// [filename] => optional value, we need a default, look "option"
// <> => required value
// [] => optional value
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "notebook.js", options) => {
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir);
        // options is for example
        // options: {port: "4005"}
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
    }
});
