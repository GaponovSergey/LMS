import {Sequelize, DataTypes} from "sequelize";

import defineUser from "./tables/User.js";
import defineCourse from "./tables/Course.js";
import defineLecture from "./tables/Lecture.js";
import defineFile from "./tables/File.js";
import defineTask from "./tables/Task.js";
import defineLectureFile from "./tables/LectureFile.js";


export const sequelize = new Sequelize("LMS", "administrator", "12345", { dialect: "postgres"});

try {
  await sequelize.authenticate()
  console.log('Соединение с БД было успешно установлено')
} catch (e) {
  console.log('Невозможно выполнить подключение к БД: ', e)
}

export const User = await defineUser(sequelize, DataTypes, Sequelize);
export const Course = await defineCourse(sequelize, DataTypes);
export const Lecture = await defineLecture(sequelize, DataTypes);
export const LectureFile = await defineLectureFile(sequelize, DataTypes);
export const File = await defineFile(sequelize, DataTypes, Sequelize);
export const Task = await defineTask(sequelize, DataTypes);

User.hasMany(Course, {
  foreignKey: "authorId"
});
User.hasMany(Lecture, {
  foreignKey: "authorId"
});
Course.belongsTo(User, {
  foreignKey: "authorId"
});

Course.hasMany(Lecture, {foreignKey: "courseId"});
Lecture.belongsTo(Course, {foreignKey: "courseId"});


sequelize.sync({force: true});

/*await User.create({
  name: "vasya",
  surname: "pupkin",
  fathername: "frankovich",
  mail: "hhh@mail.ru",
  password: "123"
})*/