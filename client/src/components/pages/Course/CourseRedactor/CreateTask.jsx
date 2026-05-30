import React, {useState, useRef} from "react";
import TaskForm from "./TaskForm";
import useScrollTo from "../../../../hooks/useScrollTo";


export default function CreateTask({data = { courseId: null, lessonId: null}}) {
    const {lessonId, courseId } = data;
    

    const formRef = useRef(null);
    const formName = `taskForm${lessonId}`;

    const [isTaskOpened, setTaskOpened] = useState(false);

    useScrollTo(formRef, formName, ()=> setTaskOpened(true));

    return(
        <div className={"tasks-create-button-container"} ref={formRef}>
            <button className={"tasks-create-button"} onClick={()=> setTaskOpened(!isTaskOpened)}>
                {isTaskOpened ? " \u25BC Скрыть" : " \u25BA Добавить задание"}
            </button>
            {isTaskOpened &&
                <TaskForm data={{ courseId, lessonId}} close={()=> setTaskOpened(false)}/>
            }
        </div>
        
    )
}