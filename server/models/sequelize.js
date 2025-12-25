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
import defineStudent from "./tables/Student.js";


export const sequelize = new Sequelize("LMS", "administrator", "12345", { dialect: "postgres"});

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
export const Student = await defineStudent(sequelize, DataTypes);

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

Lesson.belongsTo(Content);
Content.hasOne(Lesson)
Task.belongsTo(Content);


Lesson.hasMany(Task);
Task.belongsTo(Lesson);



Content.belongsToMany(File, {through:  ContentFile});
File.belongsToMany(Content, {through: ContentFile}); 

Student.hasMany(Course);
Student.hasMany(User, { foreignKey: "studentId" })

sequelize.sync({force: true}); 

