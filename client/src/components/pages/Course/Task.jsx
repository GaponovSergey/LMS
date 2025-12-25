import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";



export default function Task({data}) {

    const {title, content} = data;

    const cleanData = DOMPurify.sanitize(content.html);
    const reactContent = parse(cleanData);
    console.log(content)

    return(
        <div>
            <h3>{title}</h3>
            <div>{reactContent}</div>
        </div>
    )
}