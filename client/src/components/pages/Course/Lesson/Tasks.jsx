import React, {useState, useRef} from "react";
import Task from "./Task";
import TaskForm from "../CourseRedactor/TaskForm";
import useScrollTo from "../../../../hooks/useScrollTo";
import "./tasks.css";


export default function Tasks({id, authorId, tasks, withRedactor = false}) {

    const [isTaskOpened, setTaskOpened] = useState(false);
    const Tasks = tasks.map( (data, i) => <Task data={data} key={"task" + id + i} />);

    const formRef = useRef(null);
    const formName = `taskForm${id}`;

    useScrollTo(formRef, formName, ()=> setTaskOpened(true));

    return(
        <>
            {Tasks}
            { withRedactor && 
                <div className={"tasks-create-button-container"} ref={formRef}>
                    <button className={"tasks-create-button"}
                     onClick={()=> setTaskOpened(!isTaskOpened)}>
                        {isTaskOpened ? " \u25BC Скрыть" : " \u25BA Добавить задание"}
                    </button>
                    { isTaskOpened &&
                        <TaskForm data={{authorId, lessonId: id}} />
                    }
                </div>
                
            }
        </>
    )
}