import { Router } from "express";

import getUsers from "../controllers/getUsers.js";

export const usersRouter = Router();

usersRouter.post("/login", ()=>{});
usersRouter.post("/register", ()=>{});

usersRouter.get("/:userId", (req, res)=>{res.send("hellO " + req.params.userId)});
usersRouter.get("/", getUsers);
usersRouter.put("/", ()=>{});
usersRouter.delete("/", ()=>{});



