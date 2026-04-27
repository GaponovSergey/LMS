
import { Course, Group } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


export default async function setCourse(req, res) {
    try {

        if (!req.body || !req.body.title || !req.body.description) {
            throw new ValidationError("Поля не заполнены");
        }
        console.log(req.body);
        const course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            authorId: req.session.user.id,
            groups: [{
                name: "Общая группа"
            }]
        }, {
            include: [{model: Group}]
        }).catch((err)=> {
            throw new DataError(`Создать курс не удалось: ${err.message}`)
        });

        const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
        

        const path = join(__dirname, "/../../", "/store/", String(course.id));
        console.log(path)
        if (!fs.existsSync(path)) {
            await fs.mkdir(path, (error)=> {if (error) throw new Error(error);});
        }

        res.status(201);
        res.json(course);
 
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}