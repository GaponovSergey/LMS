

export default function defineCourse(sequelize, DataTypes) {

    return sequelize.define("course", {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        access: {
            type: DataTypes.STRING,
            defaultValue: "opened"
        },
        authorId: {
            type: DataTypes.INTEGER
        },
    })
}