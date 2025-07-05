

export default function defineTask(sequelize, DataTypes) {

    return sequelize.define("task", {
        title: {
            type: DataTypes.STRING
        },
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: "courses",
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
        contentId: {
            type: DataTypes.INTEGER,
            references: {
                model: "contents",
                key: "id"
            }
        },
        timeframe: {
            type: DataTypes.INTEGER
        }
    }) 
}