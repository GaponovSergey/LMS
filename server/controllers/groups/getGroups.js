
import { Group, GroupProfile, Profile, sequelize } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function getGroups(req, res) {
    try {
        console.log("getgroups")
       
        const group = await Group.findAll({
            where: {
                courseId: req.params.courseId
            },
            attributes: {
                include: [ [sequelize.fn('COUNT', sequelize.col('GroupProfiles.groupId')), 'studentsCount']]
            },
            include: [{
                model: GroupProfile,
                attributes: [],
            },
            {
                model: Profile,
                as: "students"
            }],
            group: ["group.id", "students->GroupProfile.groupId", "students->GroupProfile.userId", 'students.id']
        }).catch((err)=> {
            throw new DataError(`Создать курс не удалось: ${err.message}`)
        });

        console.log('getgroups')
        console.log(group)

        res.status(201);
        res.json(group);
 
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}