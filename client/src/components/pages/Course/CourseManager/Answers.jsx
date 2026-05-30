import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnswers, changeGrade } from "../../../../store/answersSlice";
import FileLink from "../Lesson/FileLink";
import "./answers.css";


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
        <div className={"coursemanager-item-container"}>
            <p>Работы на проверку:</p>
            <div className={"answers-list"}>{newWorks}</div>
            <p>Проверенные работы:</p>
            <div className={"answers-list"}>{evaluatedWorks}</div>
        </div>
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
        <div className={"answers-list-answer"}>
            <div className={"answers-list-string"}>
                <div className="answers-list-string-cell">Студент:</div>
                <div className="answers-list-string-cell">{`${student.surname} ${student.name}`}</div>
            </div>
            <div className={"answers-list-string"}>
                <div className="answers-list-string-cell">Группа:</div>
                <div className="answers-list-string-cell">{student.groups[0].groupName}</div>
            </div>
            <div className={"answers-list-string"}>
                <div className="answers-list-string-cell">Урок:</div>
                <div className="answers-list-string-cell">{task.lesson.title}</div>
            </div>
            <div className={"answers-list-string"}>
                <div className="answers-list-string-cell">Задание:</div>
                <div className="answers-list-string-cell">{task.title}</div>
            </div>
            <div className={"answers-list-string"}>
                <div className="answers-list-string-cell">Срок сдачи:</div>
                <div className="answers-list-string-cell">{ task.deadline ?  "до " + dateString.format(new Date(task.deadline)) : "не установлен"}</div>
            </div>
            <div className={"answers-list-string"}>
                <div className="answers-list-string-cell">Дата сдачи:</div>
                <div className="answers-list-string-cell">{dateString.format(new Date(createdAt))}</div>
            </div>
            <div className={"answers-list-string"}>
                <div className="answers-list-string-cell">Дата изменения:</div>
                <div className="answers-list-string-cell">{dateString.format(new Date(updatedAt))}</div>
            </div>
            <div  className={"answers-list-fileswrap"}>
                <p>Прикрепленные файлы:</p>
                <div  className={"answers-list-filescontainer"}>
                    {fileLinks}
                </div>
            </div>
            {grade ? 
                
                    <>
                        <div className={"answers-list-string"}>
                            <div className="answers-list-string-cell"><b>Оценка:</b></div> 
                            <div className="answers-list-string-cell"><b>{grade}</b></div>
                        </div>
                        <EvaluationButton id={id} courseId={courseId}>Изменить оценку</EvaluationButton>
                    </> :
                    <EvaluationButton id={id} courseId={courseId}>Поставить оценку</EvaluationButton>
            }
                
            
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
        <div className={"answers-list-value-container"}>
            
            {isOpened ?
                <>
                    <button className={"answers-list-value-button"} onClick={ ()=> setOpened(false)}>Убрать</button>
                    <SetGrade initGradeChanging={initGradeChanging} />
                </> :
                <button className={"answers-list-value-button"} onClick={()=> setOpened(true)}>{children}</button>
            }
        </div>
    )
}

export function SetGrade({initGradeChanging}) {

    return(
        <div className={"answers-list-value-gradeslist"}>
            <button onClick={ initGradeChanging(1)}>1</button>
            <button onClick={ initGradeChanging(2)}>2</button>
            <button onClick={ initGradeChanging(3)}>3</button>
            <button onClick={ initGradeChanging(4)}>4</button>
            <button onClick={ initGradeChanging(5)}>5</button>
        </div>
    )
}