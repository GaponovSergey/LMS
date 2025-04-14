import { Router } from "express";
import setLecture from "./setLecture.js";
import getLecture from "./getLecture.js";
import changeLecture from "./changeLecture.js";
import deleteLecture from "./deleteLecture.js";
import checkAccess from "../checkAccess.js";

export const lecturesRouter = Router();

lecturesRouter.get("/:lectureId", getLecture);

lecturesRouter.use(checkAccess);
lecturesRouter.post("/", setLecture);
lecturesRouter.put("/", changeLecture);
lecturesRouter.delete("/", deleteLecture);