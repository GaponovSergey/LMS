import React from "react";


export default function Lecture({data}) {

    const {title, Content} = data;
    console.log(Content)

    return(
        <div>
            <h3>{title}</h3>
            <div>{Content.content}</div>
        </div>
    )
}