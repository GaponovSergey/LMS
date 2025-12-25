import React, {useRef} from "react";
import ContentForm from "./ContentForm";
import Files from "../../Form/Files";
import { useDispatch } from "react-redux";
import { fetchLessonForm } from "../../../store/createLessonSlice";

export default function LectureForm({data, close = null}) {

    const {title = "", authorId = null, courseId = null, lessonId = null, html = ""} = data;
    const lectureRef = useRef(null);
    const dispatch = useDispatch();
    const to = "lecture";

    const handler = async (data) => {
        dispatch(await fetchLessonForm({...data, authorId, courseId, lessonId, to }) );
        if (close) close();
    }
    

    return(
        
        <ContentForm ref={lectureRef} html={html} title={title} handler={handler} >
            <Files to={to} /> 
        </ContentForm>
    )
}
