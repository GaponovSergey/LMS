
import { ValidationError, DataError } from "../models/Errors.js";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


export default async function deleteFiles(req, res, next) {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    
    try {

        if (!req.body?.files                         || 
            !Array.isArray(req.body.files.toDelete)  || 
            !req.body.files.toDelete.length          || 
            !req.body.files.toDelete[0].storeId) {
            throw new ValidationError("Файлы не указаны");
        }
        const files = [...req.body.files.toDelete];
        files.map( file => join(__dirname, "/../", "/store/", req.body.userId, "/", file.storeId));
        console.log(files);

        for(let file of files) {
            await fs.unlink(file, err => {
                    if (err) throw new DataError("ошибка при удалении: " + err);
                }
            );
        }

        next();

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}