

export default function defineContent(sequelize, DataTypes) {

    return sequelize.define("content", {
        content: {
            type: DataTypes.TEXT
        }
    }) 
}