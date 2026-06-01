import { Answer, AnswerFile, File} from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import { checkTaskAccess } from "./checking.js";
import errorHandler from "../../models/errorHandler.js";


export default async function changeAnswer(req, res, next) {
        
    try {

        if ( !req.body.taskId || !req.body.files || !req.body.files.toCreate) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {taskId, answerId} = req.body;

        await checkTaskAccess({taskId, userId: req.session.user.id});


        const files = req.body.files.toCreate.map(fileId => {
            return {fileId, answerId }
        })
        
        await AnswerFile.bulkCreate(files, {transaction: req.transaction});

        await AnswerFile.destroy({
            where: {
                answerId,
                fileId: req.body.files.toDelete
            },
            transaction: req.transaction
        })

        await Answer.update({updatedAt: (new Date()).toISOString()}, {
            where: {
                id: answerId
            },
            transaction: req.transaction
        })

        if (req.body.files.toRemove?.length) {
            next()
        } else {
            await req.transaction.commit();
            res.sendStatus(201);
        }


    } catch(err) {
        errorHandler(req, res, err)
    }
}



