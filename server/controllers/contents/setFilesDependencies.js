import { ContentFile, File } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";

export default async function setFilesDependencies(req, res, next) {
    try {

        if (!req.body.contentId || !req.body.files || !req.body.files.toCreate) {
            throw new ValidationError("нет данных о файлах")
        } 

        if (!req.body.files.toCreate.length) {

            if (req.body.result?.content) {
                req.body.result.content.files = [];
            }

            return next();
        }

        const {contentId, files} = req.body;
        
         const contentFiles = files.toCreate.map( fileId => {
            return {fileId, contentId};
        });

        console.log("contentFiles")
        console.log(contentFiles)
        console.log(req.body.result)

        await ContentFile.bulkCreate(contentFiles, {raw: true}).catch( err => {
            throw new DataError(`Создать элемент не удалось: ${err.message}`)
        });

       
            req.body.result.createdFiles = await File.findAll({
                where: {
                    id: req.body.files.toCreate
                },
                raw: true
            })
        
        
        
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