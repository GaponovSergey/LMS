import React from "react";
import Input from "../../Form/Input";
import Textarea from "../../Form/Textarea";
import Radio from "../../Form/Radio";
import Files from "../../Form/Files";
import { useDispatch, useSelector } from "react-redux";
import { setValue, setType, toggleLessonForm, fetchLessonForm } from "../../../store/createLessonSlice";


export default function CreateLesson() {

    const {title, content, lessonType, isOpened} = useSelector( state => state.createLesson);
    const authorId = useSelector( state => state.user.account.id);
    const courseId = useSelector( state => state.course.id);
    const dispatch = useDispatch();

    return(
        <>
        <button onClick={()=> dispatch(toggleLessonForm())}>{isOpened ? "закрыть" : "добавить запись"}</button>
        {isOpened && 
            <div>
                <div>
                    <p>Тип записи:</p>
                    <p><Radio name={"lessonType"} value={"lecture"} action={setType} checked={lessonType} /> лекция</p>
                    <p><Radio name={"lessonType"} value={"task"} action={setType} checked={lessonType} /> задание для самостоятельной работы</p>
                    <p><Radio name={"lessonType"} value={"test"} action={setType} checked={lessonType}/> тест</p>
                </div>
                <div>
                    <p>Название:</p>
                    <Input field={"title"} state={title} action={setValue} />
                    <p>Содержание:</p>
                    <Textarea field={"content"} state={content} action={setValue} />
                </div>
                <Files />
                <button onClick={()=> dispatch(fetchLessonForm({lessonType, data: {title, content, authorId, courseId}}))}>Создать</button>
            </div>
        }
        
        </>
    )
}