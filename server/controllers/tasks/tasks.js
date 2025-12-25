import { Router } from "express";
import setTask from "./setTask.js";
import getTask from "./getTask.js";
import changeTask from "./changeTask.js";
import deleteTask from "./deleteTask.js";
import checkAccess from "../checkAccess.js";
import addFiles from "../store/addFiles.js";

export const tasksRouter = Router();

tasksRouter.get("/:taskId", getTask);

tasksRouter.use(checkAccess);
tasksRouter.post("/", setTask, addFiles);
tasksRouter.put("/", changeTask);
tasksRouter.delete("/", deleteTask);