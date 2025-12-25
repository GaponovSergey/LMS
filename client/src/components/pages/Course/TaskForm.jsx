import React, {useRef} from "react";
import ContentForm from "./ContentForm";
import Files from "../../Form/Files";
import { useDispatch } from "react-redux";
import { fetchTaskForm } from "../../../store/createLessonSlice";

export default function TaskForm({data}) {

    const {title = "", authorId = null, courseId = null, html = ""} = data;
    const taskRef = useRef(null);
    const dispatch = useDispatch();
    const to = "task";

    const handler = (data) => {
        dispatch(fetchTaskForm({...data, authorId, courseId}) )
    }
    

    return(
        <ContentForm ref={taskRef} html={html} title={title} handler={handler} >
            <Files to={to} /> 
        </ContentForm>
    )
}
