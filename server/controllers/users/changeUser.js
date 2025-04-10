
import { ValidationError, DataError } from "../models/Errors.js";
import { User } from "../models/sequelize.js";
import argon2 from "argon2";


export default async function changeUser(req, res) {
    try {
        

        if (!req.body.userId || !req.body.password) {
            throw new ValidationError("Нет данных пользователя")
        }
        const password = argon2.hash(req.body.password);

        if (password != req.session.user.password) {
            throw new ValidationError("Доступ не разрешен")
        }        

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