

export default function defineTaskAccess(sequelize, DataTypes) {

    return sequelize.define("TaskAccess", {
        taskId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "tasks",
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
        },
        submitBefore: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        openAfter: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        timestamps: false
    })
} 