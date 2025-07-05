

export default function defineStudent(sequelize, DataTypes) {

    return sequelize.define("student", {
        courseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "courses",
                key: "id"
            }
        },
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Users",
                key: "id"
            }
        }
    })
}