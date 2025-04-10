import { Router } from "express";

import getUsers from "./getUsers.js";
import setUser from "./setUser.js";
import changeUser from "./changeUser.js";
import deleteUser from "./deleteUser.js";
import login from "./login.js";
import logout from "./logout.js";

export const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/register", setUser);

usersRouter.get("/logout", logout);
usersRouter.get("/", getUsers);
usersRouter.put("/", changeUser);
usersRouter.delete("/", deleteUser);



