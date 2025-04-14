import { Router } from "express";

import getUsers from "./getUsers.js";
import setUser from "./setUser.js";
import changeUser from "./changeUser.js";
import deleteUser from "./deleteUser.js";
import login from "./login.js";
import logout from "./logout.js";
import checkUserAccess from "./checkUserAccess.js";

export const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/logup", setUser);

usersRouter.get("/logout", logout);
usersRouter.get("/", getUsers);
usersRouter.put("/", checkUserAccess, changeUser);
usersRouter.delete("/", checkUserAccess, deleteUser);



