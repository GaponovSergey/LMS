

export default function defineProfile(sequelize, DataTypes, Sequelize) {

    return sequelize.define("Profile", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Users",
                key: "id"
            }
        },
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        fathername: {
            type: DataTypes.STRING
        },
        lastComing: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        }
    })
}