import { File } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";


export default async function setFiles(req, res) {
    try {

        
        const files = await File.bulkCreate(req.body.files.toCreate).catch((err)=> {
            throw new DataError(`Создать учетную запись файла не удалось: ${err.message}`)
        });
        console.log(files);
        req.session.files = files;
        res.status(201);
        res.json(files);
 
    } catch(err) {
        errorHandler(req, res, err);
    }
}