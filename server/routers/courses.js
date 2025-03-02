import { Router } from "express";
import setCourse from "../controllers/setCourse.js";
import getCourse from "../controllers/getCourse.js";
import getCourses from "../controllers/getCourses.js";
import changeCourse from "../controllers/changeCourse.js";
import deleteCourse from "../controllers/deleteCourse.js";

export const coursesRouter = Router();

coursesRouter.get("/:courseId", getCourse);
coursesRouter.get("/", getCourses);
coursesRouter.post("/", setCourse);
coursesRouter.put("/", changeCourse);
coursesRouter.delete("/", deleteCourse);