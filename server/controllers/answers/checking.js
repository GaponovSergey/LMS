import { TaskAccess, Group, Profile, File } from "../../models/sequelize.js";


export async function checkTaskAccess({taskId, userId}) {

    const access = await TaskAccess.findOne({
        where: {taskId}, 
        attributes: ["access"],
        include: [{
            model: Group,

            include: [{
                model: Profile,
                as: "students",
                where: {id: userId}
            }]
        }]
        
    });

    if (!access || !access.access) throw new ValidationError("У пользователя нет доступа к заданию"); 

    return;
}

