

export default function defineLecture(sequelize, DataTypes) {

    return sequelize.define("lecture", {
        title: {
            type: DataTypes.STRING
        },
        courseId: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        authorId: {
            type: DataTypes.INTEGER
        },
        contentId: {
            type: DataTypes.INTEGER
        },
    }) 
}