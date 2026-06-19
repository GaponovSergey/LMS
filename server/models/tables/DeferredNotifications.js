
export default function defineDeferredNotifications(sequelize, DataTypes) {

    return sequelize.define("deferredNotifications", {
        taskId: {
            type: DataTypes.INTEGER
        },
        notification: {
            type: DataTypes.JSON
        },
        time: {
            type: DataTypes.DATE
        }
        
    }, {
        timestamps: false
    })
}