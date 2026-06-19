import {Sequelize, DataTypes} from "sequelize";

import defineUser from "./tables/User.js";
import defineProfile from "./tables/Profile.js";
import defineCourse from "./tables/Course.js";
import defineLesson from "./tables/Lesson.js";
import defineFile from "./tables/File.js";
import defineTask from "./tables/Task.js";
import defineAnswer from "./tables/Answer.js";
import defineAnswerFile from "./tables/AnswerFile.js";
import defineContentFile from "./tables/ContentFile.js";
import defineContent from "./tables/Content.js";
import defineApplicant from "./tables/Applicant.js";
import defineGroup from "./tables/Group.js";
import defineGroupProfile from "./tables/GroupProfile.js";
import defineTaskAccess from "./tables/TaskAccess.js";
import defineCompletedCourse from "./tables/CompletedCourse.js";
import definePushSubscribers from "./tables/PushSubscribers.js";
import defineDeferredNotifications from "./tables/DeferredNotifications.js";

console.log("sequelize.js")


export const sequelize = new Sequelize("LMS", process.env.DB_USER, process.env.DB_PASSWORD, { 
  dialect: "postgres", 
  dialectOptions: {
    timezone: "UTC"
  }
});

try {
  await sequelize.authenticate()
  console.log('Соединение с БД было успешно установлено')
} catch (e) {
  console.log('Невозможно выполнить подключение к БД: ', e)
}

export const User = await defineUser(sequelize, DataTypes, Sequelize);
export const Course = await defineCourse(sequelize, DataTypes);
export const Lesson = await defineLesson(sequelize, DataTypes);
export const ContentFile = await defineContentFile(sequelize, DataTypes);
export const File = await defineFile(sequelize, DataTypes, Sequelize);
export const Profile = await defineProfile(sequelize, DataTypes, Sequelize);
export const Task = await defineTask(sequelize, DataTypes);
export const Content = await defineContent(sequelize, DataTypes);
export const Answer = await defineAnswer(sequelize, DataTypes);
export const AnswerFile = await defineAnswerFile(sequelize, DataTypes);
export const Applicant = await defineApplicant(sequelize, DataTypes);
export const Group = await defineGroup(sequelize, DataTypes);
export const GroupProfile = await defineGroupProfile(sequelize, DataTypes);
export const TaskAccess = await defineTaskAccess(sequelize, DataTypes);
export const CompletedCourse = await defineCompletedCourse(sequelize, DataTypes, Sequelize);
export const PushSubscribers = await definePushSubscribers(sequelize, DataTypes);
export const DeferredNotifications = await defineDeferredNotifications(sequelize, DataTypes);

User.hasMany(Course, {
  foreignKey: "authorId"
});
User.hasMany(Lesson, {
  foreignKey: "authorId"
});
User.hasOne(Profile, {foreignKey: "id"});
Profile.belongsTo(User, {foreignKey: "id"})
Course.belongsTo(Profile, {
  foreignKey: "authorId"
});

Lesson.belongsTo(Profile, {
  foreignKey: "authorId"
});

File.belongsTo(Profile, {
  foreignKey: "authorId"
});


Course.hasMany(Lesson);
Lesson.belongsTo(Course);

Course.hasMany(Content, {onDelete: "CASCADE"});
Course.hasMany(File, {onDelete: "CASCADE"});

Task.belongsTo(Content, {onDelete: "CASCADE"});
Content.hasOne(Task);

Lesson.belongsTo(Content, {onDelete: "CASCADE"});
Content.hasOne(Lesson);


Lesson.hasMany(Task);
Task.belongsTo(Lesson, {onDelete: "CASCADE"});

Content.belongsToMany(File, {through:  ContentFile});
File.belongsToMany(Content, {through: ContentFile}); 

Content.hasMany(ContentFile,  {onDelete: "CASCADE"})

Course.hasMany(Applicant,  {onDelete: "CASCADE"});
Applicant.belongsTo(Profile, { foreignKey: "userId" });

Course.hasMany( Group);
Group.belongsTo(Course, {foreignKey: "courseId"});

Group.belongsToMany(Profile, {through:  GroupProfile, as: "students"});
Profile.belongsToMany(Group, {through: GroupProfile, foreignKey: "userId"}); 

Group.hasMany(GroupProfile,  {onDelete: "CASCADE"});
GroupProfile.belongsTo(Group);

Task.hasMany(TaskAccess, {as: "accesses", onDelete: "CASCADE"});
Group.hasMany(TaskAccess,  {as: "accesses", onDelete: "CASCADE"});
TaskAccess.belongsTo( Group )
TaskAccess.belongsTo(Task )

Task.hasMany(Answer, {onDelete: "CASCADE"});
Answer.belongsTo(Task);
Answer.belongsTo(Profile, {as: "student", onDelete: "CASCADE"});
Course.hasMany(Answer, {onDelete: "CASCADE"})

Answer.hasMany( AnswerFile, {onDelete: "CASCADE"});
Answer.belongsToMany( File, {through: AnswerFile});
File.belongsToMany( Answer, {through: AnswerFile});
File.hasMany(AnswerFile, {foreignKey: "fileId", onDelete: "CASCADE"})
AnswerFile.belongsTo(File, {onDelete: "CASCADE"});
AnswerFile.belongsTo(Answer, {onDelete: "CASCADE"})
Profile.hasMany( Answer, {foreignKey: "studentId", onDelete: "CASCADE"}) 

CompletedCourse.belongsTo( Profile, {onDelete: "CASCADE"})
Profile.hasOne( CompletedCourse, {onDelete: "CASCADE"})

DeferredNotifications.hasMany( TaskAccess, { foreignKey: "taskId"})

sequelize.sync({alter: true}); 



