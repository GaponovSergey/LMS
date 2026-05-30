import React from "react";
import { acceptApplicant, declineApplicant } from "../../../../store/applySlice";
import { useDispatch } from "react-redux";
import "./applicants.css";


export default function Applicant({user, groupId, course}) {

    const dispatch = useDispatch()

    return(
        <div className={"applicant-container"}>
            <p>{`${user.surname} ${user.name} ${user.fathername}`}</p>
            <div className={"applicant-buttonscontainer"}>
                <button className={"applicant-button applicant-button-accept"} onClick={ ()=> dispatch(acceptApplicant({userId: user.id, groupId, ...course}) )}>Принять</button>
                <button className={"applicant-button applicant-button-reject"} onClick={ ()=> dispatch(declineApplicant({userId: user.id, ...course}) )}>Отклонить</button>
            </div>
        </div>
    )
}