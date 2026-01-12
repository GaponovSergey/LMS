import React, {useState} from "react";


export default function CourseManager() {

    const [toggle, setToggle] = useState("redactor");


    return(
        <div>
            <nav>
                <button onClick={()=> setToggle("redactor")}>Редактор курса</button>
                <button onClick={()=> setToggle("manager")}>Управление курсом</button>
                
            </nav>
            <div>
                {toggle === "redactor" && <CourseRedactor />}
                {toggle === "manager" && <LearningManager />}
                
            </div>
        </div>
    )
}