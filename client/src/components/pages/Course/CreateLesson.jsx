import React, {useRef, useState} from "react";
import Input from "../../Form/Input";
import Redactor from "../../Form/Redactor"
import Files from "../../Form/Files";
import { useDispatch, useSelector } from "react-redux";
import { setValue, setType, fetchLessonForm } from "../../../store/createLessonSlice";


export default function CreateLesson() {

    const {title} = useSelector( state => state.createLesson);
    const authorId = useSelector( state => state.user.account.id);
    const courseId = useSelector( state => state.course.id);
    const taskList = useSelector( state => state.course.lesson.tasks);
    const dispatch = useDispatch();
    const lectureRef = useRef(null);
    const [isLectureOpened, setLectureOpened] = useState(true);
    

    return(
        
        <div>
            <div>
                <button onClick={()=> setLectureOpened(!isLectureOpened)}>Добавить лекцию</button>
                <div style={isLectureOpened ? {} : {display: "none"}}>
                    <p>Название:</p>
                    <Input field={"title"} state={title} action={setValue} />
                    
                    <Redactor ref={lectureRef} />
                
                <Files />
                <button onClick={()=> {
                    dispatch(setValue({
                        field: "content",
                        value: lectureRef.current.textContent
                    }));
                    dispatch(setValue({
                        field: "html",
                        value: lectureRef.current.innerHTML
                    }));
                    dispatch(fetchLessonForm({data: {title, authorId, courseId}}))}}>Создать</button>
                </div>
            </div>
            
            <div>
                {taskList}
                <button>Добавить задание</button>
            </div>
        </div>
        
    )
}