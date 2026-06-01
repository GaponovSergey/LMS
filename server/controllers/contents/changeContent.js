import { Content } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";

export default async function changeContent(req, res, next) {
    try {

        if (!req.body.contentId || !req.body.content) {
            throw new ValidationError("нет содержания")
        } 
        
        const {content, html, contentId} = req.body
        const [, [result ]]= await Content.update({content, html}, {
            where: {
                id: contentId
            },
            returning: true
        }, {transaction: req.transaction || null});

        console.log("changeContent")
        console.log(result)
        
        req.body.result = req.body.result ?? { };
        req.body.result.content = result.get({plain: true});

        next();
    } catch(err) {
        errorHandler(req, res, err)
    }
    
}