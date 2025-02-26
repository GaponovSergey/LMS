import { Router } from "express";

import getUsers from "../controllers/getUsers.js";
import setUser from "../controllers/setUser.js";
import login from "../controllers/login.js";

export const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/register", setUser);

usersRouter.get("/:userId", (req, res)=>{res.send("hellO " + req.params.userId)});
usersRouter.get("/", getUsers);
usersRouter.put("/", ()=>{});
usersRouter.delete("/", ()=>{});



