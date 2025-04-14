import { SessionError, ValidationError } from "../../models/Errors.js";
import { User } from "../../models/sequelize.js";
import argon2 from "argon2";


export default async function checkUserAccess(req, res, next) {
        try {
            if (!req.body.userId || !req.body.password) {
                throw new ValidationError("Нет данных пользователя")
            }  
            if (!req.session.user) {
                throw new SessionError("Пользователь не авторизован");
            }
            if (req.session.user.access === 2 && req.session.user.id !== req.body.userId) {
                throw new SessionError("Пользователь не имеет прав доступа");
            }
            if (req.session.user.access < 3 ) {
                throw new SessionError("Пользователь не имеет прав доступа");
            }

            const user = await User.findByPk(req.session.user.id);

            if (!user) {
                throw new ValidationError("Нет данных пользователя");
            }

            const password = (req.body.password) ? argon2.hash(req.body.password) : req.session.user.password || null;

            if (user.password !== password) {
                throw new SessionError("Пользователь не имеет прав доступа");
            }

            req.session.user.password = password;
            
            next();

        } catch(err) {
            const {name, message} = err;
            res.status(401);
            res.json({
                name, message
            })
        }
}
