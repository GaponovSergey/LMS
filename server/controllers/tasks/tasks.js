import { Router } from "express";
import setTask from "./setTask.js";
import getTask from "./getTask.js";
import changeTask from "./changeTask.js";
import setContent from "../contents/setContent.js";
import setFilesDependencies from "../contents/setFilesDependencies.js";
import checkCourseChangeRights from "../checking/checkCourseChangeRights.js";
import changeTaskTitle from "./changeTaskTitle.js";
import checkFileRemovingRights from "../checking/checkFileRemovingRights.js";
import deleteFiles from "../store/deleteFiles.js";
import { startTransaction } from "../checking/transaction.js";


export const tasksRouter = Router();

tasksRouter.get("/:taskId", getTask);

tasksRouter.use(checkCourseChangeRights);

tasksRouter.post("/", startTransaction, setContent, setFilesDependencies, checkFileRemovingRights, deleteFiles, setTask);
tasksRouter.put("/changeTaskTitle", changeTaskTitle);
tasksRouter.put("/", changeTask);