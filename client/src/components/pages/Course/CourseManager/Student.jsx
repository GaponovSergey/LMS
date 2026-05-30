import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeGroup from "./GroupsList/ChangeGroup";
import { completeCourse, deleteStudent } from "../../../../store/groupsSlice";
import { useParams } from "react-router-dom";
import { SetGrade } from "./Answers";


export default function Student({data}) {

    const [isOpened, setOpening] = useState(false);
    const { name, surname, fathername, group, answersCount, tasks} = data;

    

    return(
        <div className={"studentslist-list-student"}>
            <div className={"studentslist-list-student-string"}>
                <div className={"studentslist-list-student-cell"}>ФИО:</div>
                <div className={"studentslist-list-student-cell"}>{`${surname} ${name} ${fathername}`}</div>
            </div>
            <div className={"studentslist-list-student-string"}>
                <div className={"studentslist-list-student-cell"}>Группа:</div>
                <div className={"studentslist-list-student-cell"}>{group.groupName}</div>
            </div>
            <div className={"studentslist-list-student-string"}>
                <div className={"studentslist-list-student-cell"}>Сдано работ:</div>
                <div className={"studentslist-list-student-cell"}>{answersCount + "/" + tasks.length}</div>
            </div>
            <div className={"studentslist-list-student-string"}>
                <button className={"studentslist-list-student-profilebutton"} onClick={()=>setOpening(true)}>Подробности</button>
            </div>            
            {isOpened && <StudentProfile data={data} close={ ()=> setOpening(false)} />}
        </div>
    )
}

function StudentProfile({data, close}) {

    const {id, name, surname, fathername, group, tasks} = data;
    const {groupName, id: groupId} = group;
    const [isChangeGroupOpened, setChangeGroupOpening] = useState(false);
    const [isDeleteStudentOpened, setDeleteStudentOpening] = useState(false);
    const [isCompleteCourseOpened, setCompleteCourseOpening] = useState(false);

    const dispatch = useDispatch();
    const {courseId} = useParams();

    const setFinalGrade = (finalGrade) => {
            return async ()=> {
                await dispatch(completeCourse({studentId: id, courseId, finalGrade}))
            }
        }

    const tasksList = tasks.map( task => <StudentTask data={task} key={"studenttask" + name + surname + fathername + task.id}/>)

    return(
        <div className={"fixed-wrap"}>
        <div className="studentslist-profile-container">
            <button className={"closebutton"} onClick={()=> close()}>&#x2716;</button>
            <div className={"studentslist-profile-title-container"}>
                <p className={"studentslist-profile-string"}>Студент:</p>
                <p className={"studentslist-profile-title"}><b>{`${surname} ${name} ${fathername}`}</b></p>
            </div>
            <div className={"studentslist-profile-title-container"}>
                <p className={"studentslist-profile-string"}>Группа:</p>
                <p className={"studentslist-profile-title"}><b>{groupName}</b></p>
            </div>
            <div className="studentslist-profile-menu">
                <div className={"studentslist-profile-changegroup-wrap"}>
                    <button className={"studentslist-profile-button studentslist-profile-changegroup-button"} onMouseDown={()=> setChangeGroupOpening(!isChangeGroupOpened)}>Перевести в другую группу</button>            
                    {isChangeGroupOpened && 
                        <ChangeGroup studentId={data.id} groupId={groupId} close={()=> setChangeGroupOpening(false)}/>
                    }
                </div>
                <button className={"studentslist-profile-button studentslist-profile-deletebutton"} onClick={ ()=> setDeleteStudentOpening(true)}>Исключить из курса</button>
                {isDeleteStudentOpened &&
                    <div className={"fixed-wrap"}> 
                        <div className={"studentslist-profile-delete-container"}>
                            <p>Подтвердите исключение  из курса студента:</p>
                            <p> <strong>{`${surname} ${name} ${fathername}`}</strong>.</p>
                            <div className="studentslist-profile-delete-menu">
                                <button className={"studentslist-profile-button studentslist-profile-deletebutton"} onClick={ ()=> dispatch(deleteStudent({studentId: id, courseId}))}>Подтверждаю</button>
                                <button className={"studentslist-profile-button studentslist-profile-completebutton"} onClick={()=> setDeleteStudentOpening(false)}>Отмена</button>
                            </div>
                        </div>
                    </div>
                }
                <button className={"studentslist-profile-button studentslist-profile-completebutton"} onClick={ ()=> setCompleteCourseOpening(true)}>Завершить обучение</button>
                {isCompleteCourseOpened && 
                <div className={"fixed-wrap"}> 
                    <div className={"studentslist-profile-delete-container"}>
                        <p>Студент <strong>{`${surname} ${name} ${fathername}`}</strong> завершает обучение на курсе.</p>
                        <p> Пожалуйста, выставите итоговую оценку:</p>
                        <SetGrade initGradeChanging={setFinalGrade} />
                        <div className="studentslist-profile-delete-menu">
                        <button className={"studentslist-profile-button studentslist-profile-deletebutton"} onClick={()=> setCompleteCourseOpening(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
                }
            </div>
            
            <div className={"studentslist-profile-tasks-wrap"}>
                <p>Задания:</p>
                <div className={"studentslist-profile-tasks-container"}>
                    {tasksList}
                </div>                
            </div>
        </div>
        </div>
    )
}

function StudentTask({data}) {
    const {title, deadline, answers} = data;

    const dateString = new Intl.DateTimeFormat("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });

    const status = {
        "none": "не сдано",
        "pending": "на проверке",
        "excepted": "принято"
    }

    return(
        <div className={"studentslist-profile-tasks-task"}>
            <div className={"studentslist-profile-tasks-task-string"}>
                <div className={"studentslist-profile-tasks-task-cell"}>Задание:</div>
                <div className={"studentslist-profile-tasks-task-cell"}>{title}</div>
            </div>
            <div className={"studentslist-profile-tasks-task-string"}>
                <div className={"studentslist-profile-tasks-task-cell"}>Срок сдачи:</div>
                <div className={"studentslist-profile-tasks-task-cell"}>{deadline ? dateString.format( new Date(deadline)) : "не установлен"}</div>
            </div>
            <div className={"studentslist-profile-tasks-task-string"}>
                <div className={"studentslist-profile-tasks-task-cell"}>Статус:</div>
                <div className={"studentslist-profile-tasks-task-cell"}>{answers[0]?.status ? status[answers[0].status] : status["none"]}</div>
            </div>
            <div className={"studentslist-profile-tasks-task-string"}>
                <div className={"studentslist-profile-tasks-task-cell"}>Оценка:</div>
                <div className={"studentslist-profile-tasks-task-cell"}>{answers[0] && answers[0].grade ? answers[0].grade : "оценки нет"}</div>
            </div>
        </div>
    )
}