import { User } from "../../models/sequelize.js";
import argon2 from "argon2";
import { DataError, ValidationError, SessionError } from "../../models/Errors.js";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export default async function setUser(req, res) {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    console.log(req.body);
    
    try{

        if (req.session.user) {
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
            .catch(()=> { 
                throw new DataError("такой пользователь уже существует");
             }); 

        
    
        const path = join(__dirname, "/../../", "/store/", String(user.id));
        console.log(user)
        if (!fs.existsSync(path)) {
            await fs.mkdir(path, (error)=> {if (error) throw new Error(error);});
        }
        

        res.sendStatus(201);

    } catch(err) {
        console.log(err);
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}