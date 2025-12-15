import React from "react";


export default function Course({data}) {
    const { id, title, description, Profile} = data;
    const { name, surname, fathername } = Profile;
    return(
        <div className="main_course" onClick={()=> window.location.href = `/courses/${id}`}>
            <strong>{title}</strong>
            <p>{description}</p>
            <span>Автор: {name + " " + surname + " " + fathername}</span>
        </div>
    )
}