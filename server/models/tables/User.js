

export default function defineUser(sequelize, DataTypes, Sequelize) {

    return sequelize.define("User", {
        mail: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING
        },
        access: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    })
}