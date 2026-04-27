

export default function defineContent(sequelize, DataTypes) {

    return sequelize.define("content", {
        content: {
            type: DataTypes.TEXT
        },
        html: {
            type: DataTypes.TEXT
        },
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: "courses",
                key: "id"
            }
        }
    }, {
        timestamps: false
    }) 
}