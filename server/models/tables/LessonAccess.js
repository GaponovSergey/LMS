

export default function defineLessonAccess(sequelize, DataTypes) {

    return sequelize.define("LessonAccess", {
        taskId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "lessons",
                key: "id"
            }
        },
        groupId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "groups",
                key: "id"
            }
        },
        access: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false
    })
}