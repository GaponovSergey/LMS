import React, { useState, useRef } from "react";
import LectureForm from "./LectureForm";
import { useDispatch, useSelector } from "react-redux";
import useScrollTo from "../../../../hooks/useScrollTo";
import "./createLesson.css";

export default function CreateLesson({isLessonsExists = false}) {

    const authorId = useSelector( state => state.user.account.id);
    const courseId = useSelector( state => state.course.id);
    const [isLectureOpened, setLectureOpened] = useState(!isLessonsExists);
    const formRef = useRef(null);
    
    console.log("lessonid")

    useScrollTo(formRef, "createLesson", ()=> setLectureOpened(true));

    return(
        <div className={"lessons-create-button-container"} ref={formRef}>
            <button  className={"lessons-create-button"} onClick={()=> {setLectureOpened(!isLectureOpened)}}> 
                {!isLectureOpened ? ` \u25BA Создать урок` : " \u25BC Свернуть"} 
            </button>
            { isLectureOpened &&
                <LectureForm data={{authorId, courseId}} close={ ()=> setLectureOpened(false) } />
            }
        </div> 
    )
}