import { File } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function setFiles(req, res) {
    try {

        
        const files = await File.bulkCreate(req.body.files.toCreate).catch((err)=> {
            throw new DataError(`Создать учетную запись файла не удалось: ${err.message}`)
        });

        req.session.files = files;
        res.status(201);
        res.json(files);
 
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}