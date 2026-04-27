import { Answer } from "../../models/sequelize.js";


export default async function changeGrade(req, res) {

    try {

        const answer = await Answer.update({
            grade: req.body.grade,
            status: "excepted"
        }, {
            where: {
                id: req.body.id
            }
        })

        console.log("changeGrade")
        console.log(answer)

        res.sendStatus(201);

    } catch(err) {
        console.log(err)
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
    
}