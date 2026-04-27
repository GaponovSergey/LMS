import { Answer, AnswerFile} from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import { checkTaskAccess } from "./checking.js";


export default async function setAnswer(req, res) {
        
    try {

        if ( !req.body.taskId || !req.body.files || !req.body.files.toCreate) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {taskId, courseId} = req.body;
        const answer = {
            taskId, courseId,
            studentId: req.session.user.id
        };


        await checkTaskAccess({taskId, userId: req.session.user.id});

        const createdAnswer = await Answer.create(answer);

        console.log("createdAnswer")
        console.log(createdAnswer)

        const files = req.body.files.toCreate.map(fileId => {
            return {fileId, answerId: createdAnswer.id }
        })
        
        await AnswerFile.bulkCreate(files);

        res.status(201);
        res.json(createdAnswer)

    } catch(err) {
        res.status(400);
        console.log(err);
        res.json(err);
    }
}
