import React from "react";


export default function Course({data}) {
    const { title, description, authorId} = data;
    return(
        <div>
            <strong>{title}</strong>
            <p>{description}</p>
            <span>{authorId}</span>
        </div>
    )
}