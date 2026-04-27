import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnswers, changeGrade } from "../../../../store/answersSlice";
import FileLink from "../Lesson/FileLink";


export default function Answers({courseId}) {

    const dispatch = useDispatch();
    const answers = useSelector( state => state.answers.answers)

    console.log("answers")
    console.log(answers)

    useEffect( ()=> {
        if (!answers.length) {
            dispatch(fetchAnswers({courseId}))
        }
    }, []);

    const newWorks = [];
    const evaluatedWorks = [];

    answers.forEach( answer => {
        
        const answerElem = <Answer data={answer} key={`answer${answer.id}`} />;

        return answer.grade ? evaluatedWorks.push(answerElem) : newWorks.push(answerElem);
    })

    return(
        <>
            <h4>Работы на проверку:</h4>
            <div>{newWorks}</div>
            <div>{evaluatedWorks}</div>
        </>
    )

}


function Answer({data}) {

    const {id, courseId, student, task, files, grade = null, createdAt, updatedAt} = data;

    const fileLinks = files.map( file => <FileLink data={file} key={`answerFile${file.id}`} />);

    const dateString = new Intl.DateTimeFormat("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });


    return(
        <div>
            <div>
                <p>Студент: <span>{`${student.surname} ${student.name}`}</span></p>
                <p>Группа: <span>{student.groups[0].groupName}</span></p>
                <p>Урок: <span>{task.lesson.title}</span></p>
                <p>Задание: <span>{task.title}</span></p>
                <div>Срок сдачи: { task.deadline ?  "до " + dateString.format(new Date(task.deadline)) : "не установлен"}</div> 
                <div>Дата сдачи: {dateString.format(new Date(createdAt))}</div>
                <div>Дата изменения: {dateString.format(new Date(updatedAt))}</div>
                <p>Прикрепленные файлы:</p>
                <div>
                    {fileLinks}
                </div>
                {grade ? 
                
                    <div>
                        <p>Оценка: {grade}</p>
                        <EvaluationButton id={id} courseId={courseId}>Изменить оценку</EvaluationButton>
                    </div> :
                    <EvaluationButton id={id} courseId={courseId}>Поставить оценку</EvaluationButton>
                }
            </div>
        </div>
    )
}


function EvaluationButton({id, courseId, children}) {

    const dispatch = useDispatch();
    const [isOpened, setOpened] = useState(false);

    const initGradeChanging = (grade) => {
        return async ()=> {
            await dispatch(changeGrade({id, courseId, grade}))
            setOpened(false);
        }
    }

    return(
        <>
            <button onClick={()=> setOpened(true)}>{children}</button>
            {isOpened &&
                <div>
                    <button onClick={ ()=> setOpened(false)}>Убрать</button>
                    <SetGrade initGradeChanging={initGradeChanging} />
                </div>
            }
        </>
    )
}

export function SetGrade({initGradeChanging}) {

    return(
        <>
            <button onClick={ initGradeChanging(1)}>1</button>
            <button onClick={ initGradeChanging(2)}>2</button>
            <button onClick={ initGradeChanging(3)}>3</button>
            <button onClick={ initGradeChanging(4)}>4</button>
            <button onClick={ initGradeChanging(5)}>5</button>
        </>
    )
}