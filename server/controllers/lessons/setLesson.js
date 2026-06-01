import { Lesson, Content, ContentFile } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";



export default async function setLesson(req, res) {
        
    try {

        if ( !req.body.courseId, !req.body.contentId) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {title, courseId, contentId} = req.body;

        const lesson = {
            title, courseId,
            authorId: req.session.user.account.id,
            contentId
        };

        const createdLesson = await Lesson.create(lesson, {transaction: req.transaction || null});

        await req.transaction.commit();

        const result = {...createdLesson.get({plain: true})};
        result.content = req.body.result.content;
        result.content.files = req.body.result.createdFiles || [];
        
        res.status(201);
        res.json(result)

    } catch(err) {
        errorHandler(req, res, err);
    }
}