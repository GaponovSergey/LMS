
import { ValidationError, DataError } from "../../models/Errors.js";
import { User } from "../../models/sequelize.js";


export default async function changeUser(req, res) {
    try {
        

              

        const user = await User.update(req.body.toChange,
            { where: {
                    id: req.body.userId
                }
            }
        );

        if (!user) {
            throw new DataError("Пользователь не найден")
        }

        res.sendStatus(201);
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}