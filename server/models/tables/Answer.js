

export default function defineAnswer(sequelize, DataTypes) {

    return sequelize.define("answer", {
        taskId: {
            type: DataTypes.INTEGER,
            references: {
                model: "tasks",
                key: "id"
            }
        },
        authorId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id"
            }
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        grade: {  // Оценка
            type: DataTypes.INTEGER
        }
    })
}