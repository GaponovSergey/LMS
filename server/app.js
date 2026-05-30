import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

import { usersRouter } from "./controllers/users/users.js";
import { coursesRouter } from "./controllers/courses/courses.js";
import { lessonsRouter } from "./controllers/lessons/lessons.js";
import { tasksRouter } from "./controllers/tasks/tasks.js";
import { fileRouter } from "./controllers/store/store.js";
import { groupsRouter } from "./controllers/groups/groups.js";
import setSession from "./models/session.js";
import authentificate from "./controllers/checking/auth.js";
import checkUserAccess from "./controllers/users/checkUserAccess.js";
import { answersRouter } from "./controllers/answers/answers.js";

export const app = express();

dotenv.config({path: "../.env"})

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

console.log(host)
app.set('trust proxy', 1);
app.use((req, res, next) => {
    console.log("req.headers")
    console.log(req.headers.origin)
    console.log(req.headers)
    next()
})
app.use(cors({
    maxAge: 86400, 
    origin: [`http://${host}:3000`, 'http://localhost:3000'], 
    credentials: true, 
    exposedHeaders: ['Set-Cookie', 'Date', 'ETag'] }

));
app.use(express.json());
app.use(cookieParser());
app.use(authentificate);

app.use("/users", usersRouter);

//app.use(checkAccess);

app.use("/courses", coursesRouter);
app.use("/groups", groupsRouter);
app.use("/lessons", lessonsRouter);
app.use("/tasks", tasksRouter);
app.use("/answers", answersRouter);

app.use("/store",  fileRouter)

app.get("/", (req, res)=> {
    res.sendStatus(200);
})

app.listen(port, host, ()=> console.log("сервер запущен"));



