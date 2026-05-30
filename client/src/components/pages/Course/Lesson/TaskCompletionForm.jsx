import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { sendAnswer, changeAnswer } from "../../../../store/lessonsSlice";
import Files from "../../../Form/Files";
import "./taskCompletionForm.css";


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
            <div className={"task-deadline-container"}><p className={"task-deadline-string"}>Срок сдачи: <b>{ deadline ?  "до " + dateString.format(new Date(deadline)) : "не установлен"}</b></p></div>  
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
                    <div className={"completionform-wrap"}>
                        <div className={"completionform-container"}>
                            <div className={"completionform-container-line"}>
                                <p>Срок сдачи:</p> <p>{ deadline ?  "до " + dateString.format(new Date(deadline)) : "не установлен"}</p>
                            </div> 
                            <div className={"completionform-container-line"}>
                                <p>Дата сдачи:</p> <p>{dateString.format(new Date(answer.createdAt))}</p>
                            </div>
                            <div className={"completionform-container-line"}>
                                <p>Дата изменения:</p> <p>{dateString.format(new Date(answer.updatedAt))}</p>
                            </div>
                            <div className={"completionform-container-line"}>
                                <p>Статус:</p> <p>{ status[answer.status] }</p>
                            </div>
                            <div className={"completionform-container-line"}>
                                <p>Оценка:</p> <p>{answer.grade ? answer.grade : "оценки нет"}</p>
                            </div>
                        </div>
                        <div className={"completionform-popup-buttonscontainer"}>
                            {answer.status !== "excepted" && 
                                <SubmitWorkButton files={answer.files} lessonId={lessonId} answerId={answer.id} taskId={taskId}>Изменить работу</SubmitWorkButton>
                            }
                        </div>
                    </div>
                    
        </>
    )
}

function SubmitWorkButton({taskId, files = null, lessonId, answerId = null, children}) {

    const [isOpened, setOpened] = useState(false);
        
    
    return(
        <>
            
            <button className={"completionform-submitbutton"} onClick={()=> setOpened(true)}>{children}</button>
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
            
                <div className={"completionform-popup-container"}>
                    <p>Пожалуйста, прикрепите сюда выполненную работу.</p>
                    <Files state={filesState}  autoremove={true} />
                    <div className={"completionform-popup-buttonscontainer"}>
                        <button className={"completionform-popup-button completionform-popup-button-accept"} onClick={async ()=> {
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
                        <button className={"completionform-popup-button completionform-popup-button-reject"}  onClick={()=> close()}>Отмена</button>    
                    </div>
                    
                </div>
            
        </>
    )
}