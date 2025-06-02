
export default function defineLectureFile(sequelize, DataTypes) {

    return sequelize.define("ContentFile", {
        ContentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Contents",
                key: "id"
            }
        },
        FileId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Files",
                key: "id"
            }
        }
        
    }, {
        timestamps: false
    })
}