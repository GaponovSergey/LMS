import React from "react";


export default function Lecture({data}) {

    const {title, content} = data;

    return(
        <div>
            <h3>{title}</h3>
            <div>{content}</div>
        </div>
    )
}