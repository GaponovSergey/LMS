import { File } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import { Op } from "sequelize";


export default async function deleteFileStats(req, res, next) {
    try {
        
        await File.destroy({
            where: {
                [Op.or]: req.body.files.toDelete 
            }
        }).catch((err)=> {
            throw new DataError(`Удалить файлы не удалось: ${err}`);
        });

        next();
 
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}