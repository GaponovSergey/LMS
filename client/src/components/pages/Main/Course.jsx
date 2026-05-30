import React, {useState, useRef, useEffect} from "react";


export default function Course({data}) {
    const { id, title, description, Profile} = data;
    const { name, surname, fathername } = Profile;

    const [isDescOpened, setDescOpening] = useState(false);
    const [isFullDesc, setFullDesc] = useState(false)
    const ref = useRef(null)

    useEffect(()=> {
        if(ref.current.getBoundingClientRect().height > 103 && !isDescOpened){
            setFullDesc(true)
        } else {
            setFullDesc(false)
        }

    }, [ref.current])
    return(
        <div className="main-course" onClick={()=> window.location.href = `/courses/${id}`}>
            <strong className="main-course-title">{title}</strong>
            <div ref={ref} 
                onClick={(e)=> {
                if (!isFullDesc && !isDescOpened) return;
                e.stopPropagation();
                setDescOpening(!isDescOpened)
                }}
                className={`main-course-description ${isFullDesc ? !isDescOpened ? "main-course-description-closed" : "main-course-description-opened" : ""}`} >{description}</div>
            
            <span>Автор: {name + " " + surname + " " + fathername}</span>
        </div>
    )
}