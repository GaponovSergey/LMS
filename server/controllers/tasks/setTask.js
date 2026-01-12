import { Task, Content, ContentFile } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function setTask(req, res, next) {
        
    try {

        if ( !req.body.lessonId) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {title = null, lessonId, content = null, html = null, files = []} = req.body;
        const task = {
            title, lessonId,
            content: {content, html, files},
            authorId: req.session.user.id
        };

        const result = await Task.create(task,{include: [{
                    model: Content
                }]}).catch( err => {
            throw new DataError(`Создать элемент не удалось: ${err.message}`)
        });


        if (files.length) {
            
            const contentId = result.content.id;

            const contentFiles = files.map( file => {
                        file.contentId = contentId;
                        return file;
                    });
            
            await ContentFile.bulkCreate(contentFiles).catch( err => {
                throw new DataError(`Создать элемент не удалось: ${err.message}`)
            });

            req.body.result = result.get({plain: true});
            next();

        }  else {
            res.status(201);
            res.json(result); 
        }

    } catch(err) {
        res.status(400);
        console.log(err);
        res.json(err);
    }
}