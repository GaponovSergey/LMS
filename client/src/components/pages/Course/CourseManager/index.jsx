import React, {useState} from "react";
import ApplicantsList from "./ApplicantsList";
import GroupsList from "./GroupsList/GroupsList";
import StudentsList from "./StudentsList";
import CourseSettings from "./CourseSettings";
import { shallowEqual, useSelector } from "react-redux";
import Answers from "./Answers";
import "./index.css";


export default function CourseManager() {

    const course = useSelector( state => {
        const {id: courseId, authorId, access} = state.course;
        return {courseId, authorId, access}; 
    }, shallowEqual)


    return(
        <div className={"coursemanager-container"}>
            
            
            <ApplicantsList course={course}/>
            <CourseSettings course={course}/>
            <GroupsList course={course}/>
            <Answers courseId={course.courseId} />
            <StudentsList course={course}/>
        </div>
    )
}

/*
<div><p>Настройки курса</p></div>
            <div><p>Заявки</p></div>
            <div><p>Группы</p></div>
            <div><p>Ученики</p></div>
            <div><p>Сданные работы</p></div>

*/