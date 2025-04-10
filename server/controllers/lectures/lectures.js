import { Router } from "express";
import setLecture from "./setLecture.js";
import getLecture from "./getLecture.js";
import changeLecture from "./changeLecture.js";

export const lecturesRouter = Router();

lecturesRouter.get("/:lectureId", getLecture);
lecturesRouter.get("/", (req, res)=>{res.send("helllO")});
lecturesRouter.post("/", setLecture);
lecturesRouter.put("/", changeLecture);
lecturesRouter.delete("/", ()=>{});