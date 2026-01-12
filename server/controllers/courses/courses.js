import { Router } from "express";
import setCourse from "./setCourse.js";
import getCourse from "./getCourse.js";
import getCourses from "./getCourses.js";
import changeCourse from "./changeCourse.js";
import deleteCourse from "./deleteCourse.js";
import checkAccess from "../checkAccess.js";
import getNavigator from "./getNavigator.js";

export const coursesRouter = Router();

coursesRouter.get("/navigator", getNavigator );
coursesRouter.get("/:courseId", getCourse);
coursesRouter.get("/", getCourses);

coursesRouter.use(checkAccess);
coursesRouter.post("/", setCourse);
coursesRouter.put("/", changeCourse);
coursesRouter.delete("/", deleteCourse);