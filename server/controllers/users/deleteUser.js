
import { ValidationError, DataError } from "../../models/Errors.js";
import { User } from "../../models/sequelize.js";


export default async function deleteUser(req, res) {
    try {
        

        if (!req.body.userId) {
            throw new ValidationError("Нет данных пользователя")
        }        

        const user = await User.destroy(
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