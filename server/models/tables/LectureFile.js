
export default function defineLectureFile(sequelize, DataTypes) {

    return sequelize.define("LectureFile", {
        lectureId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Lectures",
                key: "id"
            }
        },
        fileId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Files",
                key: "id"
            }
        }
        
    }, {
        timestamps: false
    })
}