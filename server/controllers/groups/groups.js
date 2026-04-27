import { Router } from "express";
import setGroup from "./setGroup.js";
import getGroups from "./getGroups.js";
import changeGroup from "./changeGroup.js";
import checkCourseChangeRights from "../checking/checkCourseChangeRights.js";
import getStudents from "./getStudents.js";
import changeGroupAccesses from "./changeGroupAccesses.js";
import changeGroupName from "./changeGroupName.js";
import deleteGroup from "./deleteGroup.js";
import checkCourseDataRights from "../checking/checkCourseDataRights.js";
import deleteStudent from "./deleteStudent.js";
import deleteFiles from "../store/deleteFiles.js";
import completeCourse from "./completeCourse.js";

export const groupsRouter = Router();


groupsRouter.get("/:courseId/students", checkCourseDataRights, getStudents);
groupsRouter.get("/:courseId", getGroups);

groupsRouter.use(checkCourseChangeRights);

groupsRouter.post("/", setGroup);
groupsRouter.put("/changeGroupAccesses", changeGroupAccesses);
groupsRouter.put("/changeGroupName", changeGroupName);
groupsRouter.post("/completeCourse", completeCourse, deleteStudent, deleteFiles, (_, res) => res.sendStatus(201));
groupsRouter.post("/deleteGroup", deleteGroup);
groupsRouter.post("/deleteStudent", deleteStudent, deleteFiles, (_, res) => res.sendStatus(201));
groupsRouter.put("/", changeGroup);

groupsRouter.delete("/", ()=>{});