import express from "express";

import { usersRouter } from "./routers/users.js";
import { coursesRouter } from "./routers/courses.js";
import { elementsRouter } from "./routers/elements.js";

const app = express();

const host = '127.0.0.1';
const port = 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/elements", elementsRouter);

app.listen(port, host, ()=> console.log("сервер запущен"));



//const redisStorage = require("connect-redis")(session);


