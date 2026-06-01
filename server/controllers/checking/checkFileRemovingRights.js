
import { File } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";



export default async function checkFileRemovingRights(req, res, next) {
    try {

        if(!req.session?.user) throw new ValidationError("Пользователь не авторизован");
        if(!req.body?.files?.toRemove?.length) return next();

        const ids = await File.findAll({
        attributes: ["id"], 
        where: {
            storeId: req.body.files.toRemove,
            authorId: req.session.user.account.id
        }
    })

    if (!ids.length) throw new ValidationError("Пользователь не имеет права удалять эти файлы");

       
        next();
 
    } catch(err) {
        res.status(400);
        console.log(err);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}

