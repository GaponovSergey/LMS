import React from "react";
import Input from "../Input";
import Textarea from "../Textarea";
import { setValue, fetchCourseForm } from "../../store/createCourseSlice";
import { useSelector, useDispatch } from "react-redux";



export default function CreateCourse() {

    
    const { title, description } = useSelector( state => state.createCourse );
    const authorId = useSelector( state => state.user.account.id);
    const dispatch = useDispatch();

    return(
        <>
            <h3>Новый курс</h3>
            <div>
                <p>Название:</p>
                <Input field={"title"} state={title} action={setValue} />
                <p>Описание:</p>
                <Textarea field={"description"} state={description} action={setValue} />
            </div>
            <button onClick={ ()=> dispatch( fetchCourseForm({ title, description, authorId }) ) }>Создать</button>
        </>
    )
}