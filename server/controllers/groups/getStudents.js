
import { Group, Profile, TaskAccess, Task, File, Answer } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import { Op } from "sequelize";


export default async function getStudents(req, res) {
    try {

        const students = await Profile.findAll({
            
            include: [{
                model: Group,
                through: {
                    attributes: []
                },
                where: {
                    courseId: req.params.courseId
                },
                include:[{
                    model: TaskAccess,
                    as: "accesses",
                    where: {
                        access: true
                    },
                    include: [{
                        model: Task,
                        include: [{
                            model: Answer,
                            where: {
                                studentId: {
                                    [Op.eq]: {
                                        [Op.col]: "Profile.id"
                                    }
                                }
                            },
                            include: [{
                                model: File
                            }],
                            required: false
                        }]
                    }]
                }]
            }, {
                    model: Answer,
                    include: [{
                        model: File
                    }]
                }]
        })

        const result = students.map( student => {
            const {id, name, surname, fathername, groups, answers} = student; 
            return {
                id, name, surname, fathername,
                group: {
                    id: groups[0].id,
                    groupName: groups[0].groupName
                },
                tasks: groups[0].accesses.map( data => data.task),
                answersCount: answers.length
            }
        })
        console.log('getStudents')
        console.log(students)

        res.status(200).json(result);
 
    } catch(err) {
        res.status(400);
        console.log(err);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}