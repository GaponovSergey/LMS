import { Router } from "express";
import setCourse from "./setCourse.js";
import getCourse from "./getCourse.js";
import getCourses from "./getCourses.js";
import changeCourse from "./changeCourse.js";
import deleteCourse from "./deleteCourse.js";

export const coursesRouter = Router();

coursesRouter.get("/:courseId", getCourse);
coursesRouter.get("/", getCourses);
coursesRouter.post("/", setCourse);
coursesRouter.put("/", changeCourse);
coursesRouter.delete("/", deleteCourse);