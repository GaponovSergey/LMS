import React, {useEffect, useRef} from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import FileLink from "./FileLink";
import Tasks from "./Tasks";
import { useSelector } from "react-redux";
import useScrollTo from "../../../../hooks/useScrollTo";
import "./lesson.css";


export default function Lesson({data}) {

    const {title, id, content, authorId, tasks = []} = data;
    const lessonRef = useRef(null);
    const lessonName = `lesson${id}`;

    const user = useSelector( state => state.user );

    const cleanData = DOMPurify.sanitize(content.html);
    const reactContent = parse(cleanData);
    
    const FileLinks = content.files ? content.files.map( (data, i) => <FileLink data={data} key={"filelink" + i} />) : null;

    useScrollTo(lessonRef, lessonName);

    return(
        <div className={"lesson-wrap"} ref={lessonRef}>
            <div className={"lesson-container"}>
                <div className={"lesson-title-container"}>
                    <h3 className={"lesson-title"}>{title}</h3>
                </div>
                
                <div  className={"lesson-content"}>{reactContent}</div>
                <div  className={"lesson-files-container"}>{FileLinks}</div>
                
            </div>
            <div className={"lesson-tasks-container"}>
                <Tasks id={id} tasks={tasks} authorId={authorId} withRedactor={authorId === user.account.id} />
            </div>
        </div>
    )
}