

export default function defineElement(sequelize, DataTypes, Sequelize) {

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
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        },
        authorId: {
            type: DataTypes.INTEGER
        },
    }) 
}