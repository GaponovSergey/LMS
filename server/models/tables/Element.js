

export default function defineElement(sequelize, DataTypes) {

    return sequelize.define("Element", {
        title: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        adress: {
            type: DataTypes.STRING
        },
        authorId: {
            type: DataTypes.INTEGER
        },
    })
}