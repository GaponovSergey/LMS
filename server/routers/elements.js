import { Router } from "express";

export const elementsRouter = Router();

elementsRouter.get("/:elementId", (req, res)=>{res.send("course " + req.params.elementId)});
elementsRouter.get("/", (req, res)=>{res.send("helllO")});
elementsRouter.post("/", ()=>{});
elementsRouter.put("/", ()=>{});
elementsRouter.delete("/", ()=>{});