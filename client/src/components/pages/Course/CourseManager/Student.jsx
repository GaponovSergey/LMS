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
        <div>
            <div>{`${name} ${surname} ${fathername}`}</div>
            <div>{group.groupName}</div>
            <div>Сдано работ: {answersCount + "/" + tasks.length}</div>
            <button onClick={()=>setOpening(true)}>Подробности</button>
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
        <div>
            <button onClick={()=> close()}>X</button>
            <h4>{`${name} ${surname} ${fathername}`}</h4>
            <div>Группа: {groupName}</div>
            <button onClick={()=> setChangeGroupOpening(true)}>Перевести в другую группу</button>
            
            {isChangeGroupOpened && <ChangeGroup studentId={data.id} groupId={groupId} close={()=> setChangeGroupOpening(false)}/>}
            <button onClick={ ()=> setDeleteStudentOpening(true)}>Исключить ученика</button>
            {isDeleteStudentOpened && 
                <div><p>Подтвердите исключение ученика <strong>{`${name} ${surname} ${fathername}`}</strong> из курса.</p>
                    <button onClick={ ()=> dispatch(deleteStudent({studentId: id, courseId}))}>Подтверждаю</button>
                    <button onClick={()=> setDeleteStudentOpening(false)}>Отмена</button>
                </div>

            }
            <button onClick={ ()=> setCompleteCourseOpening(true)}>Завершить обучение</button>
            {isCompleteCourseOpened && 
                <div><p>Ученик <strong>{`${name} ${surname} ${fathername}`}</strong> завершает обучение на курсе. Пожалуйста, выставите итоговую оценку:</p>
                    <SetGrade initGradeChanging={setFinalGrade} />
                    <button onClick={()=> setCompleteCourseOpening(false)}>Отмена</button>
                </div>

            }
            <div>
                <p>Задания:</p>
                {tasksList}
            </div>
        </div>
    )
}

function StudentTask({data}) {
    const {title, deadline, answers} = data;

    return(
        <div>
            <p>{title}</p>
            <p>{deadline}</p>
            <p>{answers[0] ? answers[0].status : "не сдано"}</p>
            <p>{answers[0] && answers[0].grade ? answers[0].grade : "оценки нет"}</p>
        </div>
    )
}