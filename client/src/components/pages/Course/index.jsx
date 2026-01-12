import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourse } from "../../../store/courseSlice";
import CreateLesson from "./CourseRedactor/CreateLesson";
import Lesson from "./Lesson/Lesson";
import Navigator from "./Navigator";
import "./index.css";


export default function Course() {

    const { courseId } = useParams();
    const dispatch = useDispatch();
    
    const user = useSelector( state => state.user );
    const state = useSelector( state => state.course );

    

    useEffect( ()=> {
            if (!state.isCourseLoaded) {
                dispatch(fetchCourse({courseId}));
            }
            
        }, [state.isCourseLoaded, courseId, dispatch]);

    const lessons = state.lessons.map( (data, i )=> <Lesson data={data} key={"lesson" + i} />)

    
    return(
        <main className={"course-container"}>
            <div className={"course-navigator"}><Navigator courseId={courseId}/></div>
            
            <div className={"course-lessons-container"}>
                <div className={"course-title-container"}>
                    <h2 className={"course-title"}>{state.title}</h2>
                </div>            
                <div  className={"course-description-container"}>
                    <p className={"course-description"}>{state.description}</p>
                </div>
                {lessons}
                { state.authorId === user.account.id && 
                    <CreateLesson isLessonsExists={!!lessons.length}/> 
                }
            </div>    
        </main>
    )
}