import React, {useRef} from "react";
import ContentForm from "./ContentForm";
import { useDispatch } from "react-redux";
import { fetchLessonForm } from "../../../store/createLessonSlice";

export default function LectureForm({data}) {

    const {title = "", authorId = null, courseId = null, html = ""} = data;
    const lectureRef = useRef(null);
    const dispatch = useDispatch();

    setTimeout(()=> lectureRef.current.innerHTML = html);

    const handler = (data) => {
        dispatch(fetchLessonForm({...data, authorId, courseId}) )
    }
    

    return(
        <div>
            <ContentForm redactorRef={lectureRef} html={html} title={title} handler={handler} />
        </div>
    )
}
