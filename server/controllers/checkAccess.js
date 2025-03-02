import { SessionError } from "../models/Errors.js";


export default function checkAccess(req, res, next) {
    try {
        console.log(req.method, req.session.user)
        if (req.method != "GET" && !req.session.user) {
            throw new SessionError("Пользователь не авторизован");
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