

export default function defineGroup(sequelize, DataTypes) {

    return sequelize.define("group", {
        groupName: {
            type: DataTypes.STRING,
            defaultValue: "Общая группа"
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