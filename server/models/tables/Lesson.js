

export default function defineLesson(sequelize, DataTypes) {

    return sequelize.define("lesson", {
        title: {
            type: DataTypes.STRING
        },
        courseId: {
            type: DataTypes.INTEGER
        },
        authorId: {
            type: DataTypes.INTEGER
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