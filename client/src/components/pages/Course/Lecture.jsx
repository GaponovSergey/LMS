import React from "react";


export default function Lecture({data}) {

    const {title, content} = data;
    console.log(content)

    return(
        <div>
            <h3>{title}</h3>
            <div>{content.content}</div>
        </div>
    )
}