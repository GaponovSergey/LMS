import { Router } from "express";
import setTask from "./setTask.js";
import getTask from "./getTask.js";
import changeTask from "./changeTask.js";
import deleteTask from "./deleteTask.js";
import checkAccess from "../checkAccess.js";

export const tasksRouter = Router();

tasksRouter.get("/:taskId", getTask);

tasksRouter.use(checkAccess);
tasksRouter.post("/", setTask);
tasksRouter.put("/", changeTask);
tasksRouter.delete("/", deleteTask);