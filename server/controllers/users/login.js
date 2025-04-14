import { User } from "../../models/sequelize.js";
import { DataError, ValidationError, SessionError } from "../../models/Errors.js";
import { generateJWT } from "../../models/jwt.js";
import argon2 from "argon2";


export default async function login(req, res) {
    
    
    try {
        if (req.session.user) {
                    throw new SessionError("Вы уже авторизованы");
                }
        if (!req.body || !req.body.mail || !req.body.password) {
            throw new ValidationError("Поля не заполнены");
        }
        
        const {rememberMe, ...signs} = req.body;
        const user = await User.findOne({
            attributes: ['id', 'mail', 'lastComing','password', 'createdAt'],
            where: { mail: signs.mail }
        });
        if (!user) {
            throw new DataError();
        };

        const passChecked = await argon2.verify(user.password, signs.password);
        if (!passChecked) {
            throw new DataError();
        };

        const body = {
            id: user.id,
            mail: user.mail,
            lastComing: user.lastComing,
            createdAt: user.createdAt
        }
        if (rememberMe) {
            res.cookie("token", generateJWT(body), {
                maxAge: 60000 * 60 * 24 * 90
            });
        }

        req.session.user = body;

        res.json(body);

    } catch(error) {
        res.status(400);
        res.json({
            name: error.name, 
            message: error.message
        });
    }
}



