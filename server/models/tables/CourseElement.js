

export default function defineCourseElement(sequelize, DataTypes) {

    return sequelize.define("CourseElements", {
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Courses',
                key: 'id'
            }
        },
        elementId: {
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