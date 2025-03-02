import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { usersRouter } from "./routers/users.js";
import { coursesRouter } from "./routers/courses.js";
import { elementsRouter } from "./routers/elements.js";
import setSession from "./models/session.js";
import authentificate from "./controllers/auth.js";
import checkAccess from "./controllers/checkAccess.js";

const app = express();

const host = '127.0.0.1';
const port = 3000;


app.set('trust proxy', 1);
app.use(cors({maxAge: 86400}));
app.use(express.json());
app.use(cookieParser());
app.use(setSession(), authentificate);

app.use("/users", usersRouter);

app.use(checkAccess);

app.use("/courses", coursesRouter);
app.use("/elements", elementsRouter);
app.get("/", (req, res)=> {
    res.sendStatus(200);
})

app.listen(port, host, ()=> console.log("сервер запущен"));



