import jwt from "jsonwebtoken";

const secret = 'your-secret-key';

export function generateJWT(payload) {

    const options = { expiresIn: '90d' };
  
    return jwt.sign(payload, secret, options);
}

export function verifyJWT(token) {

    return jwt.verify(token, secret);
}


