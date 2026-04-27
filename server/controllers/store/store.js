import { Router } from "express";
import setFiles from "./setFiles.js";
import uploadFile from "./uploadFile.js";
import deleteFiles from "./deleteFiles.js";
import deleteFileStats from "./deleteFileStats.js";
import getFile from "./getFile.js";
import checkAccess from "../checking/checkAccess.js";

export const fileRouter = Router();

fileRouter.get("/:user/:file", getFile);
fileRouter.get("/:user", ()=>{});
fileRouter.post("/upload/uploadFile", uploadFile);

fileRouter.use(checkAccess);

fileRouter.post("/uploadFilesData", setFiles);
fileRouter.put("/upload", deleteFiles, deleteFileStats, setFiles);
fileRouter.delete("/upload", deleteFiles, deleteFileStats, (req, res) => res.sendStatus(200));
