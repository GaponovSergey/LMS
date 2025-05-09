import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { usersRouter } from "./controllers/users/users.js";
import { coursesRouter } from "./controllers/courses/courses.js";
import { lecturesRouter } from "./controllers/lectures/lectures.js";
import { tasksRouter } from "./controllers/tasks/tasks.js";
import { fileRouter } from "./controllers/store/store.js";
import setSession from "./models/session.js";
import authentificate from "./controllers/auth.js";
import checkUserAccess from "./controllers/users/checkUserAccess.js";

const app = express();

const host = '127.0.0.1';
const port = 3001;


app.set('trust proxy', 1);
app.use(cors({maxAge: 86400, origin: 'http://localhost:3000', credentials: true, exposedHeaders: ['Set-Cookie', 'Date', 'ETag'] }));
app.use(express.json());
app.use(cookieParser());
app.use(setSession(), authentificate);

app.use("/users", usersRouter);

//app.use(checkAccess);

app.use("/courses", coursesRouter);
app.use("/lectures", lecturesRouter);
app.use("/tasks", tasksRouter);

app.use("/store",  fileRouter)

app.get("/", (req, res)=> {
    res.sendStatus(200);
})

app.listen(port, host, ()=> console.log("сервер запущен"));



