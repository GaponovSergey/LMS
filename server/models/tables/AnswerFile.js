
export default function defineAnswerFile(sequelize, DataTypes) {

    return sequelize.define("AnswerFile", {
        answerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "answers",
                key: "id"
            }
        },
        fileId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "files",
                key: "id"
            }
        }
        
    }, {
        timestamps: false
    })
}