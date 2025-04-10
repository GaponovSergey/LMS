

export default function definePart(sequelize, DataTypes) {

    return sequelize.define("Part", {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        courseId: {
            type: DataTypes.INTEGER
        },
    })
}