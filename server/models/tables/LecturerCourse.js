

export default function defineLecturerCourse(sequelize, DataTypes) {

    return sequelize.define("LecturerCourses", {
        lecturerId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Courses',
                key: 'id'
            }
        }
    },
    {
        timestamps: false
    })
}