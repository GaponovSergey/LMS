import { Router } from "express";
import setAnswer from "./setAnswer.js";
import changeAnswer from "./changeAnswer.js";
import getAnswers from "./getAnswers.js";
import checkCourseChangeRights from "../checking/checkCourseChangeRights.js";
import changeGrade from "./changeGrade.js";
import deleteFiles from "../store/deleteFiles.js";
import checkFileRemovingRights from "../checking/checkFileRemovingRights.js";
import { startTransaction, completeTransaction } from "../checking/transaction.js";


export const answersRouter = Router();

answersRouter.get("/getAnswers", getAnswers);

answersRouter.post("/setAnswer", startTransaction, checkFileRemovingRights, deleteFiles, setAnswer);
answersRouter.put("/changeAnswer", startTransaction, changeAnswer, checkFileRemovingRights, deleteFiles, completeTransaction);

answersRouter.use(checkCourseChangeRights);
answersRouter.put("/changeGrade", changeGrade)
