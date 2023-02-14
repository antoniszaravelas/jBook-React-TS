import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, directory: string) => {
  const router = express.Router();
  const fullPath = path.join(directory, filename);

  router.get("/cells", async (req, res) => {
    // make sure the cell storage file exists
    // if it doesn't exist we should create it for the users
    // read the file
    // parse a list of cells out of it
    // send list of cells back to browser
  });

  router.post("/cells", async (req, res) => {
    // take the list of cells from the request object, serialise them (so they can be written in the file)

    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    res.send({ status: "ok" });
    // write the cells into the file
  });

  return router;
};
