import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { sendAnswer, changeAnswer } from "../../../../store/lessonsSlice";
import Files from "../../../Form/Files";


export default function TaskCompletionForm({answer, taskId, lessonId, deadline = null}) {

    const dateString = new Intl.DateTimeFormat("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });

    if (!answer) return(
        <>
            <div>Срок сдачи: { deadline ?  "до " + dateString.format(new Date(deadline)) : "не установлен"}</div>  
            <SubmitWorkButton taskId={taskId} lessonId={lessonId}>Сдать работу на проверку</SubmitWorkButton>
        </>
    )

    const status = {
        "none": "не сдано",
        "pending": "на проверке",
        "excepted": "принято"
    }
    
    
    return(
        <>
                    <div>
                        <div>Срок сдачи: { deadline ?  "до " + dateString.format(new Date(deadline)) : "не установлен"}</div> 
                        <div>Дата сдачи: {dateString.format(new Date(answer.createdAt))}</div>
                        <div>Дата изменения: {dateString.format(new Date(answer.updatedAt))}</div>
                        <div>
                            Статус: { status[answer.status] }.
                        </div>
                        <div>
                            Оценка: {answer.grade ? answer.grade : "оценки нет"}.
                        </div>
                        {answer.status !== "excepted" && <SubmitWorkButton files={answer.files} lessonId={lessonId} answerId={answer.id} taskId={taskId}>Изменить работу</SubmitWorkButton>}
                    </div>
                    
        </>
    )
}

function SubmitWorkButton({taskId, files = null, lessonId, answerId = null, children}) {

    const [isOpened, setOpened] = useState(false);
        
    
    return(
        <>
            
            <button onClick={()=> setOpened(true)}>{children}</button>
            {isOpened &&
                <SubmitWorkForm taskId={taskId} files={files} lessonId={lessonId} answerId={answerId} close={ ()=> setOpened(false)} />
            }
        </>
    )

}

function SubmitWorkForm({files = null, taskId, lessonId, answerId = null, close}) {

    const { courseId } = useParams();

    const filesState = useState({
        exists: files ? [...files] : [],
        toCreate: [],
        toDelete: [],
        toRemove: []
    })

    const dispatch = useDispatch();
    return(
        <>
            
                <div>
                    <p>Пожалуйста, прикрепите сюда выполненную работу.</p>
                    <Files state={filesState}  autoremove={true} />
                    <button onClick={async ()=> {
                        if (!answerId) {
                         await dispatch( sendAnswer({
                            taskId, courseId, lessonId,
                            files: {
                                toCreate: filesState[0].toCreate.map( file => file.id ),
                                toRemove: filesState[0].toRemove
                            }
                        }))} else {
                            await dispatch( changeAnswer({
                            taskId, answerId, lessonId, courseId,
                            files: {
                                toCreate: filesState[0].toCreate.map( file => file.id),
                                toDelete: filesState[0].toDelete,
                                toRemove: filesState[0].toRemove
                            }
                        }))
                        };
                        close()}}>Отправить</button>
                    <button onClick={()=> close()}>Отмена</button>
                </div>
            
        </>
    )
}