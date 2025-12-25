import React, { useState } from "react";
import LectureForm from "./LectureForm";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";


export default function CreateLesson() {

    
    const authorId = useSelector( state => state.user.account.id);
    const courseId = useSelector( state => state.course.id);
    const {id, lecture, tasks} = useSelector( state => state.createLesson);
    const dispatch = useDispatch();
    const [isLectureOpened, setLectureOpened] = useState(true);
    const [isTaskOpened, setTaskOpened] = useState(false);
    console.log("lessonid")
    console.log(id)

    return(
        
        <div>
            <div>
                <button onClick={()=> {setLectureOpened(!isLectureOpened)}}>{!isLectureOpened ? `${ lecture ? "Редактировать" : "Добавить" } лекцию` : "Свернуть"}</button>
                { isLectureOpened &&
                    <LectureForm data={
                        lecture && {...lecture, authorId, courseId} || {lessonId: id, authorId, courseId} 
                    } close={()=> setLectureOpened(false)} />
                }
            </div>                  
            {id &&
                <div>
                    {tasks}
                    <button onClick={()=> setTaskOpened(!isTaskOpened)}>Добавить задание</button>
                    { isTaskOpened &&
                        <TaskForm data={
                            {authorId, courseId} 
                        } />
                    }
                </div>
            }
        </div>
        
    )
}