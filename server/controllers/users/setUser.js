import { User } from "../../models/sequelize.js";
import argon2 from "argon2";
import { DataError, ValidationError, SessionError } from "../../models/Errors.js";



export default async function setUser(req, res) {

    console.log(req.body);
    
    try{

        if (req.session?.user) {
            throw new SessionError("Вы уже авторизованы");
        }
        if (!req.body || !req.body.mail || !req.body.password) {
            throw new ValidationError("Поля не заполнены");
        }

        const {mail, name, surname, fathername} = req.body;
        
        const password = await argon2.hash(req.body.password);

        const user = await User.create({mail, password, 
            access: 2,
            Profile: {
                name, surname, fathername
            }
        }, {
            include:["Profile"
            ]
        })

        res.sendStatus(201);

    } catch(err) {
        console.log(err);

        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400);
            res.json({
                name: "Отказ в регистрации",
                message: "Пользователь с таким адресом e-mail уже существует"
            });
            return;
        }
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}