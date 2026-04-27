import React, {useRef, useState} from "react";
import Files from "../../../Form/Files";
import Redactor from "../../../Form/Redactor";
import { useDispatch } from "react-redux";
import { fetchTaskForm } from "../../../../store/createLessonSlice";
import DualListBox from "./DualListBox";
import InputDeadline from "./InputDeadline";
import "./taskForm.css";

export default function TaskForm({data, close}) {

    const {title = "", lessonId, courseId} = data;
    const dispatch = useDispatch();
    const redactorRef = useRef(null);
    

    const [titleState, setTitle] = useState(title);
    const deadline = useState(null);
    const accessState = useState([]);

    const filesState = useState({
                toDelete: [],
                exists: [],
                toCreate: [],
                toRemove: []
            })

    const handler = async ( ) => {
        await dispatch(fetchTaskForm({
            lessonId, courseId, 
            groupsAccess: accessState[0],
            title: titleState,
            content: redactorRef.current.textContent,
            html: redactorRef.current.innerHTML,
            deadline: deadline[0] ? (new Date(deadline[0])).toISOString() : null,
            files: {
                toCreate: filesState[0].toCreate.map( file => file.id),
                toDelete: filesState[0].toDelete,
                toRemove: filesState[0].toRemove
            }
        }));
        close();
    }

    

    return(
        <>
            <div className={"task-form-title"}>
                <p>Введите название задания:</p>
                <input type={"text"} onChange={e => setTitle(e.target.value)} defaultValue={title} />
            </div> 
            <DualListBox accessState={accessState} />
            <InputDeadline formState={deadline} />
            <div className={"task-form-redactor"}>
                <Redactor ref={redactorRef} html={""} />
            </div>
            <div className={"task-form-files-container"}>
                <Files   state={filesState}/> 
            </div>
            <div className={"task-form-button-container"}>
                <button className={"task-form-create-button"} onClick={() => handler()}>Создать</button>
            </div>
        </>
    )
}
