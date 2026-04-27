import { Answer, Task, Profile, File, Group, Lesson } from "../../models/sequelize.js";


export default async function getAnswers(req, res) {

    try {

        const answers = await Answer.findAll({
            where: {
                courseId: req.query.courseId
            },
            include: [{
                model: Task,
                include: [{
                    model: Lesson
                }]
            }, {
                model: Profile,
                as: "student",
                include: [{
                    model: Group,
                    where: {
                        courseId: req.query.courseId
                    }
                }]
            }, {
                model: File
            }],
            order: [["createdAt", "DESC"]],
            raw: false
        });

        console.log("getanswers")
        console.log(answers)

        res.status(200).json(answers);

    } catch(err) {
        console.log(err)
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
    
}