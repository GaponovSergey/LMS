
export default function defineGroupProfile(sequelize, DataTypes) {

    return sequelize.define("GroupProfile", {
        groupId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "groups",
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
        },
        subscribed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
        
    }, {
        timestamps: false
    })
}