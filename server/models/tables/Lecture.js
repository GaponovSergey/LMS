

export default function defineLecture(sequelize, DataTypes) {

    return sequelize.define("Lecture", {
        title: {
            type: DataTypes.STRING
        },
        courseId: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        partId: {
            type: DataTypes.INTEGER
        },
        authorId: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.TEXT
        }
    }) 
}