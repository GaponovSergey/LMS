import React, {useRef} from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import FileLink from "./FileLink";
import useScrollTo from "../../../../hooks/useScrollTo";
import "./task.css";


export default function Task({data}) {

    const {title, content, id} = data;
    const taskRef = useRef(null);
    const taskName = `task${id}`;

    const cleanData = DOMPurify.sanitize(content.html);
    const reactContent = parse(cleanData);

    const FileLinks = content.files ? content.files.map( (data, i) => <FileLink data={data} key={"filelink" + i} />) : null;

    useScrollTo(taskRef, taskName);

    return(
        <div className={"task-container"} ref={taskRef}>
            <div className={"task-title-container"}><h3 className={"task-title"}>{title}</h3></div>
            <div className={"task-content"}>{reactContent}</div>

            <div  className={"task-files-container"}>{FileLinks}</div>
        </div>
    )
}