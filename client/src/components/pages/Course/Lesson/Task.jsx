import React, {useRef, useState} from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import FileLink from "./FileLink";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { changeTaskTitle, dropTask} from "../../../../store/lessonsSlice";
import ChangeTitle from "../CourseRedactor/ChangeTitle";
import ChangeContent from "../CourseRedactor/ChangeContent";
import DeleteContent from "../CourseRedactor/DeleteContent";
import TaskCompletionForm from "./TaskCompletionForm";
import useScrollTo from "../../../../hooks/useScrollTo";
import "./task.css";


export default function Task({taskId, lessonId, courseId}) {

    const data = useSelector( state => {
        const lesson = state.lessons.lessons.find( lesson => lesson.id === lessonId);
        console.log("taskdata")
        return lesson.tasks.find( task => task.id === taskId) 
    })
    const {title, content, authorId, deadline = null, answers = []} = data;
    const taskRef = useRef(null);
    const taskName = `task${taskId}`;

    console.log("task")
    console.log(taskName)

    const userId = useSelector( state => state.user.account.id );

    const dispatch = useDispatch();

    const changeTitle = (title)=> {
            dispatch(changeTaskTitle({courseId, lessonId, taskId, title}))
        }

    

        const dateString = new Intl.DateTimeFormat("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });

  

    const cleanData = DOMPurify.sanitize(content.html);
    const reactContent = parse(cleanData);

    const FileLinks = content.files ? content.files.map( (data, i) => <FileLink data={data} key={"filelink" + i} />) : null;



    useScrollTo(taskRef, taskName);

    return(
        <div className={"task-container"} ref={taskRef}>
            <div className={"task-title-container"}>
                { userId === authorId ? 
                    <ChangeTitle title={title} changeTitle={changeTitle}>
                        <h3 className={"task-title"}>{title}</h3>
                    </ChangeTitle> :
                    <h3 className={"task-title"}>{title}</h3>
                } 
            </div>
            { userId === authorId ? 
                <>
                    <ChangeContent data={{authorId, content, courseId, lessonId, taskId, files: content.files}} key={"changeContent-lesson" + taskId}>
                        <div className={"task-content"}>{reactContent}</div>
                        <div  className={"task-files-container"}>{FileLinks}</div>
                    </ChangeContent>
                    <DeleteContent data={{courseId, contentId: content.id}} callback={ ()=> dispatch(dropTask({lessonId, taskId}))}>
                        <p>Вы действительно хотите удалить задание "{title}"?</p>
                    </DeleteContent>
                </> :
                <>
                    <div className={"task-content"}>{reactContent}</div>
                    <div  className={"task-files-container"}>{FileLinks}</div>
                </>
            }
            
            {userId !== authorId ?
                <TaskCompletionForm answer={answers[0]} deadline={deadline} lessonId={lessonId} taskId={taskId} /> :
                <div>Срок сдачи: { deadline ?  "до " + dateString.format(new Date(deadline)) : "не установлен"}</div>
            }
            
        </div>
    )
}

