import { Router } from "express";
import setElement from "../controllers/setElement.js";

export const elementsRouter = Router();

elementsRouter.get("/:elementId", (req, res)=>{res.send("course " + req.params.elementId)});
elementsRouter.get("/", (req, res)=>{res.send("helllO")});
elementsRouter.post("/", setElement);
elementsRouter.put("/", ()=>{});
elementsRouter.delete("/", ()=>{});