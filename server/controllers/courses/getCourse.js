
import { ValidationError, DataError } from "../../models/Errors.js";
import { Course, Lesson, Content, File, Task, Group, GroupProfile, sequelize } from "../../models/sequelize.js";
import getCourseAsAuthor from "./getCourseAsAuthor.js";
import getCourseAsGuest from "./getCourseAsGuest.js";
import getCourseAsGroupMember from "./getCourseAsGroupMember.js";

export default async function getCourse(req, res) {
    try {
        console.log("req.params.courseId")
        console.log(req.session)
        if (typeof +req.params.courseId != "number") {
            throw new ValidationError("Некорректный id курса")
        }

        const course = await Course.findOne({
            where: {
                id: req.params.courseId
            },
            raw: true
        });

        console.log("course");
        console.log(course);

        if (!course) {
            throw new DataError("Курс не найден")
        }

        if (!req.session?.user) {
            if (course.access === "opened") {
                await getCourseAsGuest(course);
            }
            return res.json(course);
        }

        if (req.session.user.account.id === course.authorId) {
            await getCourseAsAuthor(course);
            return res.json(course);
        } 

        if (course.access === "closed") {
            return res.json(course);
        }

        console.log("req.params2")
        console.log(req.session.user )
        
        course.group = await GroupProfile.findOne({
            where: {
                userId: req.session.user.account.id,                },
                attributes: [ "groupId", [sequelize.col("group.groupName"), "groupName"], [sequelize.col("group->course.id"), "courseId"]],
            include: [{
                model: Group,
                attributes: [],
                include: {
                    model: Course,
                    attributes: [],
                    where: {id: req.params.courseId}
                },
                required: true
            }]
        });
        
        console.log("group.toJSON()");
        console.log(course.group);

        if (course.access === "groups only") {
            if (course.group) {
                await getCourseAsGroupMember(course, req.session.user.account.id)
            }
            return res.json(course);
        }

        if (course.access === "opened") {
            if (course.group) {
                await getCourseAsGroupMember(course, req.session.user.account.id)
            } else {
                await getCourseAsGuest(course);
            }
            res.json(course);
        }

    } catch(err) {
        console.log(err)
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}