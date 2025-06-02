import {Sequelize, DataTypes} from "sequelize";

import defineUser from "./tables/User.js";
import defineProfile from "./tables/Profile.js";
import defineCourse from "./tables/Course.js";
import defineLecture from "./tables/Lecture.js";
import defineFile from "./tables/File.js";
import defineTask from "./tables/Task.js";
import defineContentFile from "./tables/ContentFile.js";
import defineContent from "./tables/Content.js";


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
export const ContentFile = await defineContentFile(sequelize, DataTypes);
export const File = await defineFile(sequelize, DataTypes, Sequelize);
export const Profile = await defineProfile(sequelize, DataTypes, Sequelize);
export const Task = await defineTask(sequelize, DataTypes);
export const Content = await defineContent(sequelize, DataTypes);

User.hasMany(Course, {
  foreignKey: "authorId"
});
User.hasMany(Lecture, {
  foreignKey: "authorId"
});
User.hasOne(Profile, {foreignKey: "id"});
Profile.belongsTo(User, {foreignKey: "id"})
Course.belongsTo(Profile, {
  foreignKey: "authorId"
});

Lecture.belongsTo(Profile, {
  foreignKey: "authorId"
});

File.belongsTo(Profile, {
  foreignKey: "authorId"
});


Course.hasMany(Lecture, {foreignKey: "courseId"});
Lecture.belongsTo(Course, {foreignKey: "courseId"});

Lecture.belongsTo(Content, {foreignKey: "contentId"});
Task.belongsTo(Content, {foreignKey: "contentId"});

Content.belongsToMany(File, {through: {
  model: ContentFile,
foreignKey: "contentId"}});
File.belongsToMany(Content, {through: ContentFile}); 

sequelize.sync({force: true}); 

/*await User.create({
  name: "vasya",
  surname: "pupkin",
  fathername: "frankovich",
  mail: "hhh@mail.ru",
  password: "123"
})*/