import React from "react";
import { useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Task from "./Task";
import CreateTask from "../CourseRedactor/CreateTask";
import "./tasks.css";


export default function Tasks({lessonId}) {

    const taskIds = useSelector( state => {
        const lesson = state.lessons.lessons.find( lesson => lesson.id === lessonId);
        return lesson.tasks ? lesson.tasks.map( task => task.id) : [];
    }, shallowEqual);

    const withRedactor = useSelector( state => state.course.authorId === state.user.account.id);

    const { courseId } = useParams();

    const tasks = taskIds.map( taskId => <Task taskId={taskId} lessonId={lessonId} courseId={courseId} key={"task" + taskId } />);

    return(
        <>
            {tasks}
            { withRedactor && 
                <CreateTask data={{ courseId, lessonId}} />
            }
        </>
    )
}