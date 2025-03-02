import {Sequelize, DataTypes} from "sequelize";

import defineUser from "./tables/User.js";
import defineCourse from "./tables/Course.js";
import defineElement from "./tables/Element.js";
import defineTextElement from "./tables/TextElement.js";

import defineCourseElement from "./tables/CourseElement.js";
import defineLecturerCourse from "./tables/LecturerCourse.js";


export const sequelize = new Sequelize("LMS", "administrator", "12345", { dialect: "postgres"});

try {
  await sequelize.authenticate()
  console.log('Соединение с БД было успешно установлено')
} catch (e) {
  console.log('Невозможно выполнить подключение к БД: ', e)
}

export const User = await defineUser(sequelize, DataTypes, Sequelize);
export const Course = await defineCourse(sequelize, DataTypes);
export const Element = await defineElement(sequelize, DataTypes, Sequelize);
export const TextElement = await defineTextElement(sequelize, DataTypes);

export const CourseElement = await defineCourseElement(sequelize, DataTypes);
export const LecturerCourse = await defineLecturerCourse(sequelize, DataTypes);

User.belongsToMany(Course, {through: LecturerCourse});
User.hasMany(Course, {
  foreignKey: "authorId"
});
User.hasMany(Element, {
  foreignKey: "authorId"
});
Course.belongsToMany(User, {through: LecturerCourse});
Element.belongsToMany(Course, {through: CourseElement});
Course.belongsToMany(Element, {through: CourseElement});

Element.TextElement = Element.hasOne(TextElement, {
  sourceKey: "uuid",
  foreignKey: "uuid"
});
Element.CourseElement = Element.hasMany(CourseElement, {
  sourceKey: "id",
  foreignKey: "ElementId"
})

TextElement.Element = TextElement.belongsTo(Element, {
  targetKey: "uuid",
  foreignKey: "uuid"
})

sequelize.sync({force: true});

/*await User.create({
  name: "vasya",
  surname: "pupkin",
  fathername: "frankovich",
  mail: "hhh@mail.ru",
  password: "123"
})*/