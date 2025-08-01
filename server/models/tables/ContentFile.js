
export default function defineLectureFile(sequelize, DataTypes) {

    return sequelize.define("ContentFile", {
        contentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "contents",
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