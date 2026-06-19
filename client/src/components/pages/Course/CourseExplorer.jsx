import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Lesson from "./Lesson/Lesson";
import ButtonApplyFor from "./ButtonApplyFor";
import SubscribeButton from "./SubscribeButton";
import "./index.css";


export default function CourseExplorer({userId}) {

    const { courseId } = useParams();
    
    
    console.log("courseExplorer")
    
    const course = useSelector( state => {
        const {group, access} = state.course;
        return {group, access}; 
    }, shallowEqual);

    const lessonIds = useSelector( state => state.lessons.lessons.map(lesson => lesson.id), shallowEqual);

    const lessons = lessonIds.map( lessonId => <Lesson lessonId={lessonId} key={"lesson" + lessonId} />)

    
    return(
        <>
            
                { (userId && !course.group.groupId ) && 
                    <div className={"course-apply-button-container"}>
                        <ButtonApplyFor courseId={courseId} />
                    </div>
                }
                { course.group.groupId &&
                    <div className={"course-groupname-container"}>Ваша группа: <strong>{course.group.groupName}</strong>
                    <SubscribeButton groupId={course.group.groupId} subscribed={course.group.subscribed} />
                    </div>
                }
                { course.access === "closed" &&
                    <div>Извините, курс закрыт для просмотра.</div> }
                {course.access === "groups only" &&
                    (course.group?.groupId ? lessons :
                        <div>Доступ к курсу ограничен. Чтобы просмотреть данный курс, необходимо подать заявку</div>)
                }
                {course.access === "opened" && lessons}
                
               
        </>
    )
}




