
import { Group } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function changeGroupName(req, res) {
    try {

        if (!req.body || !req.body.groupId || !req.body.groupName ) {
            throw new ValidationError("Поля не заполнены");
        }
        console.log(req.body);
        const group = await Group.update({groupName: req.body.groupName},{
            where: {
                id: req.body.groupId
            }
        }).catch((err)=> {
            throw new DataError(`Поменять группу не удалось: ${err.message}`)
        });

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