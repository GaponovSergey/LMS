import { ContentFile, File } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";

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
            }, 
            transaction: req.transaction || null
        })

        req.body.result.deletedFiles = req.body.files.toDelete

        next();

    } catch(err) {
        errorHandler(req, res, err)
    }
    
}