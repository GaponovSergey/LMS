

export default function defineTask(sequelize, DataTypes) {

    return sequelize.define("Task", {
        title: {
            type: DataTypes.STRING
        },
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Courses",
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
                model: "Contents",
                key: "id"
            }
        },
        timeframe: {
            type: DataTypes.INTEGER
        }
    }) 
}