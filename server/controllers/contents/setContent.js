import { Content } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";

export default async function setContent(req, res, next) {
    try {

        if (!req.body.html || !req.body.content) {
            throw new ValidationError("нет содержания")
        } 
        
        const {content, html, courseId} = req.body
        const result = await Content.create({content, html, courseId});
        
        req.body.contentId = result.id;
        req.body.result = req.body.result ?? { };
        req.body.result.content = result.get({plain: true});

        next();
    } catch(err) {
        res.status(400);
        console.log(err)
        res.json({
            name: err.name,
            message: err.message
        });
    }
    
}