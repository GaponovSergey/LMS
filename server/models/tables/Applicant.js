

export default function defineApplicant(sequelize, DataTypes) {

    return sequelize.define("applicant", {
        courseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "courses",
                key: "id"
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Profiles",
                key: "id"
            }
        }
    })
}