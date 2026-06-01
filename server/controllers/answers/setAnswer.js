import { Answer, AnswerFile} from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import { checkTaskAccess } from "./checking.js";
import errorHandler from "../../models/errorHandler.js";


export default async function setAnswer(req, res) {
        
    try {

        if ( !req.body.taskId || !req.body.files || !req.body.files.toCreate) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {taskId, courseId} = req.body;
        const answer = {
            taskId, courseId,
            studentId: req.session.user.account.id
        };


        await checkTaskAccess({taskId, userId: req.session.user.account.id});

        const createdAnswer = await Answer.create(answer, {transaction: req.transaction || null});

        console.log("createdAnswer")
        console.log(createdAnswer)

        const files = req.body.files.toCreate.map(fileId => {
            return {fileId, answerId: createdAnswer.id }
        })
        
        await AnswerFile.bulkCreate(files, {transaction: req.transaction || null});

        if (req.transaction) await req.transaction.commit();

        res.status(201);
        res.json(createdAnswer)

    } catch(err) {
        errorHandler(req, res, err)
    }
}
