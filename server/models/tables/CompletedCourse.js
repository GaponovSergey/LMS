

export default function defineCompletedCourse(sequelize, DataTypes, Sequelize) {

    return sequelize.define("completedCourse", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Profiles",
                key: "id"
            }
        },
        course: {
            type: DataTypes.JSON
        },
        link: {
            type: DataTypes.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        finalGrade: {
            type: DataTypes.INTEGER
        }
    })
}