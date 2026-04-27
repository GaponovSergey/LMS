import { Router } from "express";
import setLesson from "./setLesson.js";
import getLesson from "./getLesson.js";
import changeLessonTitle from "./changeLessonTitle.js";
import checkAccess from "../checking/checkAccess.js";
import checkCourseChangeRights from "../checking/checkCourseChangeRights.js";
import setContent from "../contents/setContent.js";
import setFilesDependencies from "../contents/setFilesDependencies.js";
import checkFileRemovingRights from "../checking/checkFileRemovingRights.js";
import deleteFiles from "../store/deleteFiles.js";

export const lessonsRouter = Router();

lessonsRouter.get("/:lectureId", getLesson);

lessonsRouter.use(checkCourseChangeRights);
lessonsRouter.post("/", setContent, setFilesDependencies, checkFileRemovingRights, deleteFiles, setLesson );
lessonsRouter.put("/changeLessonTitle", changeLessonTitle);