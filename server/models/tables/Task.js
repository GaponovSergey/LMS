

export default function defineTask(sequelize, DataTypes) {

    return sequelize.define("task", {
        title: {
            type: DataTypes.STRING
        },
        authorId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id"
            }
        },
        contentId: {
            type: DataTypes.INTEGER,
            references: {
                model: "contents",
                key: "id"
            }
        },
        lessonId: {
            type: DataTypes.INTEGER,
            references: {
                model: "lessons",
                key: "id"
            }
        },
        timeframe: {
            type: DataTypes.INTEGER
        }
    }) 
}