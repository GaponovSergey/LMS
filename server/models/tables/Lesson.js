

export default function defineLesson(sequelize, DataTypes) {

    return sequelize.define("lesson", {
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
                model: "Profiles",
                key: "id"
            }
        },
        access: {
            type: DataTypes.STRING,
            defaultValue: "opened"
        },
        contentId: {
            type: DataTypes.INTEGER,
            references: {
                model: "contents",
                key: "id"
            }
        },
    }) 
}