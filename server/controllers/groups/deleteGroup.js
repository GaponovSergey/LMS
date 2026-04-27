import { Group, GroupProfile } from "../../models/sequelize.js";


export default async function deleteGroup(req, res) {
    try {

        const students = await GroupProfile.findAll({where: {
            groupId: req.body.groupId
        }, raw: true });

        if (students.length) throw new Error("Группу нельзя удалить, пока в ней есть участники.");

        const groups = await Group.findAll({where: {
            courseId: req.body.courseId
        }, raw: true });

        if (groups.length < 2) throw new Error("На курсе должна быть хотя бы одна группа");

        await Group.destroy({where: {
            id: req.body.groupId
        }});

        res.sendStatus(200);

    } catch(err) {
        console.log(err)
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}