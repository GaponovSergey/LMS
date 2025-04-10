

export default function defineFile(sequelize, DataTypes, Sequelize) {

    return sequelize.define("File", {
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.INTEGER
        },
        authorId: {
            type: DataTypes.INTEGER
        },
        storeId: {
            type: DataTypes.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        }
    })
}