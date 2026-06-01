import { Task, TaskAccess, Group, Lesson} from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";


export default async function setTask(req, res) {
        
    try {

        if ( !req.body.lessonId) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {title = null, groupsAccess = [], lessonId, contentId, deadline = null} = req.body;
        const task = {
            title, lessonId, contentId,
            authorId: req.session.user.account.id,
            deadline
        };

        console.log("taskAccess")
        console.log(groupsAccess)
        await checkGroups(req.body);

        const createdTask = await Task.create(task, {transaction: req.transaction || null}).catch( err => {
            throw new DataError(`Создать элемент не удалось: ${err.message}`)
        });

        console.log("createdTask")
        console.log(createdTask)
        
        const taskAccess = groupsAccess.map( group => {
            group.taskId = createdTask.id; 
            return group;
        });

        const accesses = await TaskAccess.bulkCreate(taskAccess, {
            attributes: ["taskId", "groupId", "access"], 
            transaction: req.transaction || null
        })

        if (req.transaction) await req.transaction.commit();

        const result = {...createdTask.get({plain: true})};
        result.accesses = accesses;
        result.content = req.body.result.content;
        result.content.files = req.body.result.createdFiles || [];
        
        res.status(201);
        res.json(result)

    } catch(err) {
        errorHandler(req, res, err);
    }
}



async function checkGroups({groupsAccess, lessonId, courseId}) {

    const requestGroups = groupsAccess.map( group => group.groupId);

    const course = await Lesson.findOne({where: {id: lessonId, courseId}, attributes: ["courseId"]});

    if (!course.courseId) throw new ValidationError("Урока не существует"); 

    const controlGroups = await Group.findAll({
        where: {
            id: requestGroups,
            courseId
        }, 
        attributes: ["id"]
    });

    if (requestGroups.length !== controlGroups.length) throw new ValidationError("Группы не соответствуют курсу");
}