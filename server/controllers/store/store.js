import { Router } from "express";
import setFiles from "./setFiles.js";
import uploadFile from "./uploadFile.js";
import deleteFiles from "./deleteFiles.js";
import deleteFileStats from "./deleteFileStats.js";

export const fileRouter = Router();

fileRouter.post("/upload/:user", uploadFile);
fileRouter.post("/upload", setFiles);
fileRouter.put("/upload", deleteFiles, deleteFileStats, setFiles);
fileRouter.delete("/upload", deleteFiles, deleteFileStats, (req, res) => res.sendStatus(200));
fileRouter.get("/:user/:file", ()=>{});
fileRouter.get("/:user", ()=>{});