import { User } from "../models/sequelize.js";
import argon2 from "argon2";
import { DataError, ValidationError, SessionError } from "../models/Errors.js";

export default async function setUser(req, res) {
    
    try{

        if (req.session.user) {
            throw new SessionError("Вы уже авторизованы");
        }
        if (!req.body || !req.body.mail || !req.body.password) {
            throw new ValidationError("Поля не заполнены");
        }
        
        req.body.password = await argon2.hash(req.body.password);

        await User.create(req.body)
            .catch(()=> { throw new DataError("такой пользователь уже существует") }); 

        res.sendStatus(201);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}