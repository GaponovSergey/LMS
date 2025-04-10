import { verifyJWT } from "../models/jwt.js";
import { SessionError } from "../models/Errors.js";

export default function authentificate(req, res, next) {
    try {
        if (req.cookie?.token && !req.session.user) {
            const user = verifyJWT(req.cookie.token);

            req.session.user = user;
            next();
        }
        console.log(req.session.user)
        next()  
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }   
     
}