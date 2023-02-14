"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const isProduction = process.env.NODE_ENV === "production";
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "notebook.js", options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        // if we are in production, and isProduction is true, we push !isProduction
        // which is false, which means that we will not use a Proxy (as we are not developing)
        yield (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction);
        console.log(`Server is running on port ${options.port}`);
        // options is for example
        // options: {port: "4005"}
    }
    catch (error) {
        const isLocalApiError = (err) => {
            return typeof err.code === "string";
        };
        if (isLocalApiError(error)) {
            if (error.code === "EADDRINUSE") {
                console.error("Port is in use. Try running on a different port.");
            }
        }
        else if (error instanceof Error) {
            console.log("Heres the problem", error.message);
        }
        process.exit(1);
    }
}));
