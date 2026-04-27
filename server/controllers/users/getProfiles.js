import { Profile } from "../../models/sequelize.js";
import { DataError } from "../../models/Errors.js";


export default async function getProfiles(req, res) {

    try {

        const userIds = req.body.users;
        const users = await Profile.findAll({
        where: {
            id: userIds
        }
        });

        console.log(users)
        res.json(users);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}