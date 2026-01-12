import React, {useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { triggerLink } from "../../../../store/navigatorSlice";
import TaskLink from "./TaskLink";
import "./lessonLink.css";

export default function LessonLink({data, withRedactor = false}) {

    const dispatch = useDispatch();
    const {id, title, tasks} = data;
    const navName = `lesson${id}`;

    const [isOpened, setOpened] = useState(false);
    const tasksList = tasks.map(task => <TaskLink data={task} key={navName + "task" + task.id} />);

    

    return(
        <div className={"lesson-link-container"}>
           <div className={"lesson-link-wrap"}>
                <button className={"lesson-link-toggle-button"} disabled={!tasks.length && !withRedactor ? "disabled" : false} onClick={(e)=> {
                    setOpened(!isOpened)
                    }}>{isOpened ? "\u25BC" : "\u25BA"}</button>
             <button onClick={()=> {
                
                dispatch(triggerLink(navName))
                }}  className={"lesson-link-button"}>
                <span className={"lesson-link-button-title"}>{title}</span>
            </button>
            </div>
            {
                isOpened &&
                <div className={"lesson-link-tasks-container"}>
                    {tasksList}
                    { withRedactor &&
                        <button className={"task-create-link-button"} onClick={()=> dispatch(triggerLink(`taskForm${id}`))}>Добавить задание</button>
                    }
                </div>
            }
        </div>
    )
}