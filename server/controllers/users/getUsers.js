import { User } from "../../models/sequelize.js";

export default async function getUsers(req, res) {
    console.log(req.query);
    res.json(await User.findAll({
        attributes: ["id"]
    }))
} 