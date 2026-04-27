import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchCourse } from "../../../../store/courseSlice";
import { fetchGroups } from "../../../../store/groupsSlice";
import CreateLesson from "./CreateLesson";
import CourseManager from "../CourseManager";
import Lesson from "../Lesson/Lesson";
//import "./index.css";


export default function CourseRedactor() {

    const { courseId } = useParams();
    const dispatch = useDispatch();
    console.log("courseRedactor")

    const lessonIds = useSelector( state => state.lessons.lessons.map(lesson => lesson.id), shallowEqual);

    const [toggle, setToggle] = useState("redactor");

    useEffect( ()=> {
        
            dispatch(fetchGroups({courseId}));
        
            
    }, [courseId]);

    const lessons = lessonIds.map( lessonId => <Lesson lessonId={lessonId} key={"lesson" + lessonId} />)

    return(
        <>
            <div>
                <button onClick={()=> {
                    setToggle("redactor");
                }} disabled={ toggle === "redactor" ? "disabled" : false}>Редактор курса</button>
                <button onClick={()=> {
                    setToggle("manager");
                }} disabled={ toggle === "manager" ? "disabled" : false}>Управление курсом</button>
            </div>
            {   toggle === "manager" && 
                <CourseManager />
            }
            {toggle === "redactor" && 
                <>
                    {lessons}
                    <CreateLesson isLessonsExists={!!lessons.length}/> 
                </>
            }
            
        </>
    )
}