import { verifyJWT } from "../../models/jwt.js";
import { SessionError } from "../../models/Errors.js";

export default function authentificate(req, res, next) {
    try {
        console.log('req.cookie')
        console.log(req.cookies)
        if (req.cookies?.token && !req?.session?.user) {
            const user = verifyJWT(req.cookies.token);

            req.session = {user};
            console.log("req.session.user")
            console.log(req.session.user)
            return next();
        }
        
        next()  
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }   
     
}