import { Lecture, Content, ContentFile } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";



export default async function setLecture(req, res) {
        
    try {

        if ( !req.body.courseId) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {title = null, description = null, courseId, content = null, files = []} = req.body;

        const lecture = {
            title, description, courseId,
            authorId: req.session.user.id,
            Content: { content }
        };

        const result = await Lecture.create(lecture, {include: [{
            model: Content
        }]}).catch( err => {
            throw new DataError(`Создать элемент не удалось: ${err.message}`)
        });

        const contentFiles = files.map( file => {
            file.ContentId = result.Content.id
            return file;
        });

        await ContentFile.bulkCreate(contentFiles).catch( err => {
            throw new DataError(`Создать элемент не удалось: ${err.message}`)
        });

  
        res.sendStatus(201);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}