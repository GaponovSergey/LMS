
import { DataError } from "../../models/Errors.js";
import { Lecture } from "../../models/sequelize.js";


export default async function getLecture(req, res) {
    try {

        const lecture = await Lecture.findOne({
            where: {
                id: +req.params.lectureId
            }
        });

        
        if (!lecture) {
            throw new DataError("Элемент не найден")
        }

        res.json(lecture);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}