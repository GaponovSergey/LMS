

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
        content: {
            type: DataTypes.TEXT
        },
        timeframe: {
            type: DataTypes.INTEGER
        }
    }) 
}