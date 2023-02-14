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
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, directory) => {
    const router = express_1.default.Router();
    const fullPath = path_1.default.join(directory, filename);
    router.get("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // make sure the cell storage file exists
        // if it doesn't exist we should create it for the users
        // read the file
        // parse a list of cells out of it
        // send list of cells back to browser
    }));
    router.post("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // take the list of cells from the request object, serialise them (so they can be written in the file)
        const { cells } = req.body;
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), "utf-8");
        res.send({ status: "ok" });
        // write the cells into the file
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
