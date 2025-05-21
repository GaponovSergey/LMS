import React from "react";


export default function Course({data}) {
    const { id, title, description, authorId} = data;
    return(
        <div className="main_course" onClick={()=> window.location.href = `/courses/${id}`}>
            <strong>{title}</strong>
            <p>{description}</p>
            <span>{authorId}</span>
        </div>
    )
}