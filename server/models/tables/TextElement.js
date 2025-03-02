

export default function defineTextElement(sequelize, DataTypes) {

    return sequelize.define("textElement", {
        
        uuid: {
            type: DataTypes.UUID,
            unique: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT
        }
    })
}