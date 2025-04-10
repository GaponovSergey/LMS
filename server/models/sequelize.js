import {Sequelize, DataTypes} from "sequelize";

import defineUser from "./tables/User.js";
import defineCourse from "./tables/Course.js";
import defineLecture from "./tables/Lecture.js";
import definePart from "./tables/Part.js";
import defineFile from "./tables/File.js";


export const sequelize = new Sequelize("LMS", "administrator", "12345", { dialect: "postgres"});

try {
  await sequelize.authenticate()
  console.log('Соединение с БД было успешно установлено')
} catch (e) {
  console.log('Невозможно выполнить подключение к БД: ', e)
}

export const User = await defineUser(sequelize, DataTypes, Sequelize);
export const Course = await defineCourse(sequelize, DataTypes);
export const Lecture = await defineLecture(sequelize, DataTypes, Sequelize);
export const Part = await definePart(sequelize, DataTypes);
export const File = await defineFile(sequelize, DataTypes, Sequelize);

User.hasMany(Course, {
  foreignKey: "authorId"
});
User.hasMany(Lecture, {
  foreignKey: "authorId"
});
Course.belongsTo(User);

Lecture.hasMany(Course);
Course.belongsTo(Lecture, {foreignKey: "courseId"});

Course.hasMany(Part);
Part.belongsTo(Course);

sequelize.sync({force: true});

/*await User.create({
  name: "vasya",
  surname: "pupkin",
  fathername: "frankovich",
  mail: "hhh@mail.ru",
  password: "123"
})*/