

export default function defineAnswer(sequelize, DataTypes) {

    return sequelize.define("answer", {
        taskId: {
            type: DataTypes.INTEGER,
            references: {
                model: "tasks",
                key: "id"
            }
        },
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: "courses",
                key: "id"
            }
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Profiles",
                key: "id"
            }
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending"
        },
        grade: {  // Оценка
            type: DataTypes.INTEGER,
            defaultValue: null
        }
    })
}