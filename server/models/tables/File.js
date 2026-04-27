

export default function defineFile(sequelize, DataTypes, Sequelize) {

    return sequelize.define("file", {
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.INTEGER
        },
        lastModified: {
            type: DataTypes.DATE
        },
        authorId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Profiles",
                key: "id"
            }
        },
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: "courses",
                key: "id"
            }
        },
        storeId: {
            type: DataTypes.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        }
    })
}