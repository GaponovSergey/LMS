import { File } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";

export default async function addFiles(req, res) {
    try {
        const {files, result} = req.body;
        const ids = files.map( file => file.fileId);
        result.content.files = await File.findAll({
                where: {
                    id: ids
                }
            }
        );
        
        
        res.status(201);
        res.json(result);

    } catch(err) {
        res.status(400);
        console.log(err)
        res.json({
            name: err.name,
            message: err.message
        })
    }
}
