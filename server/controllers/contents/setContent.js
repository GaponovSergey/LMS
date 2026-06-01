import { Content } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";

export default async function setContent(req, res, next) {
    try {

        if (!req.body.html || !req.body.content) {
            throw new ValidationError("нет содержания")
        } 
        
        const {content, html, courseId} = req.body
        const result = await Content.create({content, html, courseId}, {transaction: req.transaction || null});
        
        req.body.contentId = result.id;
        req.body.result = req.body.result ?? { };
        req.body.result.content = result.get({plain: true});

        next();
    } catch(err) {
        errorHandler(req, res, err);
    }
    
}