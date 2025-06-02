import { Course, Profile } from "../../models/sequelize.js";


export default async function getCourses(req, res) {

    const query = req.query || null;

    const courses = await Course.findAll({include: [Profile]});

    res.json(courses);
}