

export default function defineContent(sequelize, DataTypes) {

    return sequelize.define("Content", {
        content: {
            type: DataTypes.TEXT
        }
    }) 
}