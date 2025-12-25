import { Lesson, Content, ContentFile } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";



export default async function setLesson(req, res, next) {
        
    try {

        if ( !req.body.courseId) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {title = null, courseId, content = null, html = null, files = []} = req.body;

        const lesson = {
            title, courseId,
            authorId: req.session.user.id,
            content: { content, html, files }
        };

        const result = await Lesson.create(lesson, {include: [{
                model: Content
            }]
        }).catch( err => {
            throw new DataError(`Создать элемент не удалось: ${err.message}`)
        });

        const contentId = result.content.id;

        const contentFiles = files.map( file => {
            return {...file, contentId};
        });

        console.log(contentFiles)

        await ContentFile.bulkCreate(contentFiles).catch( err => {
            throw new DataError(`Создать элемент не удалось: ${err.message}`)
        });

        if(!files.length) {
            res.status(201);
            res.json(result)

        } else {
            req.body.result = result.get({plain: true});
            next();
        }
        

    } catch(err) {
        res.status(400);
        console.log(err)
        res.json({
            name: err.name,
            message: err.message
        })
    }
}