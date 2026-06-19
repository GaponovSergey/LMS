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
            notifications: deadline[0] ? createNotifications({deadline: deadline[0], courseId, title: titleState}) : [],
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
            
                <Redactor ref={redactorRef} html={""} />
            
            <div className={"task-form-files-container"}>
                <Files   state={filesState}/> 
            </div>
            <div className={"task-form-button-container"}>
                <button className={"task-form-create-button"} onClick={() => handler()}>Создать</button>
            </div>
        </>
    )
}

function createNotifications({deadline, courseId, title}) {

    const periods = [ {
        period: 604800000,
        string: "7 дней"
    }, { 
        period: 259200000,
        string: "3 дня",
    }, {
        period: 86400000, 
        string: "1 день"
    }, {
        period: 28800000,
        string: "8 часов"
    }, {
        period: 7200000,
        string: "2 часа"
    }, {
        period: 2700000,
        string: "45 минут"
    }];

    const begin = new Date();
    const end = new Date(deadline);
    const term = end.getTime() - begin.getTime();

    const notifications = [];

    for (let period of periods) {

        if (period.period - 2700000 >= term) continue;

        const time = (new Date( end.getTime() - period.period )).toISOString();

        notifications.push({
            title: "Срок сдачи подходит к концу",
            body: `До истечения срока сдачи задания "${title}" осталось ${period.string}!`,
            data: {
                url: `/courses/${courseId}`
            },
            time 
        })
    }

    return notifications;

}