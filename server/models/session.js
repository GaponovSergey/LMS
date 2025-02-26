
import session from "express-session";
import { RedisStore } from "connect-redis";
import { client } from "./redis.js";


export default function setSession() {

    const redisStore = new RedisStore({
        client,
        prefix: "user:"
    });
    
    return session({
        store: redisStore,
        secret: 'you secret key',
        httpOnly: false,
        rolling: true,
        cookie: {
            maxAge: 600000
        },
        saveUninitialized: true
    });
}
