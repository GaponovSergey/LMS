import { Element } from "../models/sequelize.js";
import { ValidationError, DataError } from "../models/Errors.js";


export default async function setElement(req, res) {

    try {

        if ( !req.body.CourseId || !req.body.type) {
            throw new ValidationError("Поля не заполнены")
        }

        const {title = null, type, description = null, CourseId} = req.body;
        const element = {
            title, type, description,
            authorId: req.session.user.id,
            CourseElements: {
                CourseId
            }
        };
        const associations = [
            Element.CourseElement
        ];

        if (type == "text") {
            element.textElement = {
                content: req.body.content
            };
            associations.push(Element.TextElement)
        }

        await Element.create(element, {
            include: associations
        }).catch( err => {
            throw new DataError(`Создать курс не удалось: ${err.message}`)
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