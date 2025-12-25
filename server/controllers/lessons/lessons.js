import { Router } from "express";
import setLesson from "./setLesson.js";
import getLesson from "./getLesson.js";
import changeLesson from "./changeLesson.js";
import deleteLesson from "./deleteLesson.js";
import checkAccess from "../checkAccess.js";
import addFiles from "../store/addFiles.js";

export const lessonsRouter = Router();

lessonsRouter.get("/:lectureId", getLesson);

lessonsRouter.use(checkAccess);
lessonsRouter.post("/", setLesson, addFiles );
lessonsRouter.put("/", changeLesson);
lessonsRouter.delete("/", deleteLesson );