import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, directory: string) => {
  const router = express.Router();
  //   body parsing middleware
  router.use(express.json());
  const fullPath = path.join(directory, filename);

  router.get(
    "/cells",
    async (req, res) => {
      const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === "string";
      };

      try {
        await fs.readFile(fullPath, { encoding: "utf-8" });
      } catch (error) {
        if (isLocalApiError(error)) {
          if (error.code === "ENOENT") {
            await fs.writeFile(fullPath, "[]", "utf-8");
            res.send([]);
          }
        } else {
          throw error;
        }
      }
    }
    // if it doesn't exist we should create it for the users (after an error has been thrown)
    // parse a list of cells out of it
    // send list of cells back to browser
  );

  router.post("/cells", async (req, res) => {
    // take the list of cells from the request object, serialise them (so they can be written in the file)

    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    res.send({ status: "ok" });
    // write the cells into the file
  });

  return router;
};
