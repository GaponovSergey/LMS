

export default function defineCourseElement(sequelize, DataTypes) {

    return sequelize.define("CourseElements", {
        CourseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Courses',
                key: 'id'
            }
        },
        ElementId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Elements',
                key: 'id'
            }
        },
    },
    {
        timestamps: false
    })
}