import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchCourse } from "../../../store/courseSlice";
import Navigator from "./Navigator";
import CourseRedactor from "./CourseRedactor";
import CourseExplorer from "./CourseExplorer";
import ChangeCourseTitle from "./CourseRedactor/ChangeCourseTitle";
import "./index.css";
import ChangeCourseDescription from "./CourseRedactor/ChangeCourseDescription";


export default function Course() {

    const { courseId } = useParams();
    const dispatch = useDispatch();
    
    console.log("COURSE")
    const userId = useSelector( state => state.user.account.id );
    const {loadingTrigger, title, authorId, description} = useSelector( state => {
        const {loadingTrigger, title, authorId, description} = state.course; 
        return {loadingTrigger, title, authorId, description};
    }, shallowEqual);

    

    useEffect( ()=> {
        
            dispatch(fetchCourse({courseId}));
        
            
    }, [loadingTrigger, courseId, userId]);

    
    return(
        <main className={"course-container"}>
            <div className={"course-navigator"}><Navigator courseId={courseId}/></div>
            
            <div className={"course-lessons-container"}>

                <div className={"course-title-container"}>
                    { authorId === userId ?
                        <ChangeCourseTitle><h2 className={"course-title"}>{title}</h2></ChangeCourseTitle> :
                        <h2 className={"course-title"}>{title}</h2>
                    }
                </div>            
                <div  className={"course-description-container"}>
                    { authorId === userId ?
                        <ChangeCourseDescription><p className={"course-description"}>{description}</p></ChangeCourseDescription> :
                        <p className={"course-description"}>{description}</p>
                    }
                </div>
                { authorId === userId ?
                    <CourseRedactor />  : <CourseExplorer userId={userId}/>                 
                }
            </div>    
        </main>
    )
}