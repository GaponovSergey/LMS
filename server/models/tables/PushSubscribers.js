

export default function definePushSubscribers(sequelize, DataTypes) {

    return sequelize.define("pushSubscriber", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        subscription: {
            type: DataTypes.JSON
        }
    })
}