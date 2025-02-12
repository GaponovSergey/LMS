import { Router } from "express";

export const coursesRouter = Router();

coursesRouter.get("/:courseId", (req, res)=>{res.send("course " + req.params.userId)});
coursesRouter.get("/", (req, res)=>{res.send("helllO")});
coursesRouter.post("/", ()=>{});
coursesRouter.put("/", ()=>{});
coursesRouter.delete("/", ()=>{});