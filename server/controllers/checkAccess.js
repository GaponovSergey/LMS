import { SessionError, ValidationError } from "../models/Errors.js";
import { User } from "../models/sequelize.js";
import argon2 from "argon2";


export default async function checkAccess(req, res, next) {
        try {
            if (!req.body.authorId) {
                throw new ValidationError("Нет данных")
            }  
            if (!req.session.user) {
                throw new SessionError("Пользователь не авторизован");
            }
            if (req.session.user.access === 2 && req.session.user.id !== req.body.authorId) {
                throw new SessionError("Пользователь не имеет прав доступа");
            }
            if (req.session.user.access < 3 ) {
                throw new SessionError("Пользователь не имеет прав доступа");
            }

            next();

        } catch(err) {
            const {name, message} = err;
            res.status(401);
            res.json({
                name, message
            })
        }
}
