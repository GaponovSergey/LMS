import { Content } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";

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
        });

        console.log("changeContent")
        console.log(result)
        
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