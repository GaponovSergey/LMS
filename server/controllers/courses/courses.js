import { Router } from "express";
import setCourse from "./setCourse.js";
import getCourse from "./getCourse.js";
import getCourses from "./getCourses.js";
import deleteCourse from "./deleteCourse.js";
import checkAccess from "../checking/checkAccess.js";
import getNavigator from "./getNavigator.js";
import { applicantsRouter } from "../applicants/applicants.js";
import changeAccess from "./changeAccess.js";
import checkCourseChangeRights from "../checking/checkCourseChangeRights.js";
import changeCourseTitle from "./changeCourseTitle.js";
import changeCourseDescription from "./changeCourseDescription.js";
import changeContent from "../contents/changeContent.js";
import setFilesDependencies from "../contents/setFilesDependencies.js";
import dropFilesDependencies from "../contents/dropFilesDependencies.js";
import deleteContent from "../contents/deleteContent.js";
import deleteFiles from "../store/deleteFiles.js";
import checkFileRemovingRights from "../checking/checkFileRemovingRights.js";




export const coursesRouter = Router();

coursesRouter.get("/navigator", getNavigator );

coursesRouter.use("/", applicantsRouter);

coursesRouter.get("/:courseId", getCourse);
coursesRouter.get("/", getCourses);

coursesRouter.post("/", checkAccess, setCourse);

coursesRouter.use(checkCourseChangeRights);

coursesRouter.put("/changeAccess", changeAccess);
coursesRouter.put("/changeContent", changeContent, setFilesDependencies, dropFilesDependencies, checkFileRemovingRights, deleteFiles, (req, res) => res.json(req.body.result));
coursesRouter.post("/deleteContent", deleteContent)
coursesRouter.put("/changeCourseTitle", changeCourseTitle);
coursesRouter.put("/changeCourseDescription", changeCourseDescription);
coursesRouter.post("/deleteCourse", deleteCourse, deleteFiles, (req, res) => res.status(200).json(req.body.res));