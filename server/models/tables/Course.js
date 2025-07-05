

export default function defineCourse(sequelize, DataTypes) {

    return sequelize.define("course", {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        authorId: {
            type: DataTypes.INTEGER
        },
    })
}