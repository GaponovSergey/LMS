import React, {useRef, useState} from "react";
import Files from "../../../Form/Files";
import Redactor from "../../../Form/Redactor";
import { useDispatch } from "react-redux";
import { fetchLessonForm } from "../../../../store/createLessonSlice";
import "./lectureForm.css";

export default function LectureForm({data, close = null}) {

    const {title = "", authorId = null, courseId = null, lessonId = null, html = ""} = data;
    const dispatch = useDispatch();
    const to = "lecture";

    const redactorRef = useRef(null);
    
        const [titleState, setTitle] = useState(title);
    
        const handler = ( ) => {
            dispatch(fetchLessonForm({
                lessonId, authorId, courseId,
                title: titleState,
                content: redactorRef.current.textContent,
                html: redactorRef.current.innerHTML
            }) )
            if (close) close();
        }
    

    return(
        <>
            <div className={"lecture-form-title"}>
                <p>Введите название урока:</p>
                <input type={"text"} onChange={e => setTitle(e.target.value)} defaultValue={title} />
            </div> 
        
            <div className={"task-form-redactor"}><Redactor ref={redactorRef} html={html} /></div>
                            <div className={"lecture-form-files-container"}>
                                <Files to={to} /> 
                            </div>
                        <div className={"lecture-form-button-container"}>
                            <button className={"lecture-form-create-button"} onClick={() => handler()}>Создать</button>
                        </div>
        </>
    )
}
