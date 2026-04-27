import { ContentFile, File } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";

export default async function dropFilesDependencies(req, res, next) {
    try {

        if (!req.body.contentId || !req.body.files || !req.body.files.toDelete) {
            throw new ValidationError("нет данных о файлах")
        } 

        if (!req.body.files.toDelete.length) {

            return next();
        }

        const {contentId, files} = req.body;

        console.log("deleteFilesDeps")
        console.log(files)
        console.log(req.body.result)

        await ContentFile.destroy({
            where: {
                fileId: files.toDelete,
                contentId
            }
        })

        req.body.result.deletedFiles = req.body.files.toDelete

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