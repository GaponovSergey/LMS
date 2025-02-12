import { User } from "../models/sequelize.js";

export default async function getAllUsers(req, res) {
    console.log(req.query);
    console.log(await User.findAll());
    res.send(await User.findAll())
}