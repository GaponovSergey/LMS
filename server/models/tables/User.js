

export default function defineUser(sequelize, DataTypes, Sequelize) {

    return sequelize.define("User", {
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        fathername: {
            type: DataTypes.STRING
        },
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
        lastComing: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        }
    })
}