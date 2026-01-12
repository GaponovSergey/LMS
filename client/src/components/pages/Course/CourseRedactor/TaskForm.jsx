import React, {useRef, useState} from "react";
import Files from "../../../Form/Files";
import Redactor from "../../../Form/Redactor";
import { useDispatch } from "react-redux";
import { fetchTaskForm } from "../../../../store/createLessonSlice";
import useScrollTo from "../../../../hooks/useScrollTo";
import "./taskForm.css";

export default function TaskForm({data}) {

    const {title = "", authorId = null, lessonId, html = ""} = data;
    const dispatch = useDispatch();
    const to = "task";
    const redactorRef = useRef(null);
    

    const [titleState, setTitle] = useState(title);

    const handler = ( ) => {
        dispatch(fetchTaskForm({
            lessonId, authorId, 
            title: titleState,
            content: redactorRef.current.textContent,
            html: redactorRef.current.innerHTML
        }) )
    }

    return(
        <>
            <div className={"task-form-title"}>
                <p>Введите название задания:</p>
                <input type={"text"} onChange={e => setTitle(e.target.value)} defaultValue={title} />
            </div> 
        
            <div className={"task-form-redactor"}><Redactor ref={redactorRef} html={html} /></div>
                <div className={"task-form-files-container"}>
                    <Files to={to} /> 
                </div>
            <div className={"task-form-button-container"}>
                <button className={"task-form-create-button"} onClick={() => handler()}>Создать</button>
            </div>
        </>
    )
}
