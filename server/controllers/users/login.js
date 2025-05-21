import { User, Profile } from "../../models/sequelize.js";
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

        const prof = await Profile.findAll();
        const user = await User.findOne({
            where: { mail: signs.mail },
            include: {
                model: Profile,
                attributes: {
                    exclude: ['id']
                }
            }
        });
        if (!user) {
            throw new DataError();
        };

        const passChecked = await argon2.verify(user.password, signs.password);
        if (!passChecked) {
            throw new DataError(); 
        };
        console.log(user);
        //console.log(prof);
        const body = {
            account: {
                id: user.id,
                mail: user.mail,
                level: user.access,
                createdAt: user.createdAt
            },
            profile: user.Profile.dataValues
        }
        if (rememberMe) {
            res.cookie("token", generateJWT(body), {
                maxAge: 60000 * 60 * 24 * 90
            });
        }

        req.session.user = {
            id: user.id,
            mail: user.mail,
            level: user.access,
            createdAt: user.createdAt
        };

        res.json(body);

    } catch(error) {
        res.status(400);
        res.json({
            name: error.name, 
            message: error.message
        });
    }
}



