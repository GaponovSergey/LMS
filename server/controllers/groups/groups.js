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
import { startTransaction, completeTransaction } from "../checking/transaction.js";

export const groupsRouter = Router();


groupsRouter.get("/:courseId/students", checkCourseDataRights, getStudents);
groupsRouter.get("/:courseId", getGroups);

groupsRouter.use(checkCourseChangeRights);

groupsRouter.post("/", startTransaction, setGroup, completeTransaction);
groupsRouter.put("/changeGroupAccesses", changeGroupAccesses);
groupsRouter.put("/changeGroupName", changeGroupName);
groupsRouter.post("/completeCourse", startTransaction, completeCourse, deleteStudent, deleteFiles, completeTransaction);
groupsRouter.post("/deleteGroup", deleteGroup);
groupsRouter.post("/deleteStudent", startTransaction, deleteStudent, deleteFiles, completeTransaction);
groupsRouter.put("/", changeGroup);
