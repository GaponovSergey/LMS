import React, {useState} from "react";
import ApplicantsList from "./ApplicantsList";
import GroupsList from "./GroupsList/GroupsList";
import StudentsList from "./StudentsList";
import CourseSettings from "./CourseSettings";
import { shallowEqual, useSelector } from "react-redux";
import Answers from "./Answers";


export default function CourseManager() {

    const course = useSelector( state => {
        const {id: courseId, authorId, access} = state.course;
        return {courseId, authorId, access}; 
    }, shallowEqual)


    return(
        <div>
            <ApplicantsList course={course}/>
            <CourseSettings course={course}/>
            <GroupsList course={course}/>
            <Answers courseId={course.courseId} />
            <StudentsList course={course}/>
        </div>
    )
}