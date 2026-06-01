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
import { startTransaction, completeTransaction } from "../checking/transaction.js";



export const coursesRouter = Router();

coursesRouter.get("/navigator", getNavigator );

coursesRouter.use("/", applicantsRouter);

coursesRouter.get("/:courseId", getCourse);
coursesRouter.get("/", getCourses);

coursesRouter.post("/", checkAccess, startTransaction, setCourse);

coursesRouter.use(checkCourseChangeRights);

coursesRouter.put("/changeAccess", changeAccess);
coursesRouter.put("/changeContent", startTransaction, changeContent, 
    setFilesDependencies, dropFilesDependencies, checkFileRemovingRights, deleteFiles, completeTransaction);
coursesRouter.post("/deleteContent", deleteContent)
coursesRouter.put("/changeCourseTitle", changeCourseTitle);
coursesRouter.put("/changeCourseDescription", changeCourseDescription);
coursesRouter.post("/deleteCourse", startTransaction, deleteCourse, deleteFiles, completeTransaction);