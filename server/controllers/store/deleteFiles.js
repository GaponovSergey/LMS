
import { ValidationError, DataError } from "../../models/Errors.js";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import errorHandler from "../../models/errorHandler.js";


export default async function deleteFiles(req, res, next) {

    try {

        if (!req.body?.files?.toRemove?.length ) {
            return next();
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        for await (let file of req.body.files.toRemove) {
            const path = join(__dirname, "/../../", "/store/", String(req.body.courseId), file);
            console.log(path)
            if (!fs.existsSync(path) ) throw new DataError("файла не существует");
            await fs.unlink(path, err => {
                    if (err) throw new DataError("ошибка при удалении: " + err);
                }
            ); 
        }

        next(); 

    } catch(err) {
        errorHandler(req, res, err);
    }
}