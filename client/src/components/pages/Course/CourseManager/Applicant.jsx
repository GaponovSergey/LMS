import React from "react";
import { acceptApplicant, declineApplicant } from "../../../../store/applySlice";
import { useDispatch } from "react-redux";


export default function Applicant({user, groupId, course}) {

    const dispatch = useDispatch()

    return(
        <div><span>{`${user.name} ${user.surname} ${user.fathername}`}</span>
        <div>
            <button onClick={ ()=> dispatch(acceptApplicant({userId: user.id, groupId, ...course}) )}>Принять</button>
            <button onClick={ ()=> dispatch(declineApplicant({userId: user.id, ...course}) )}>Отклонить</button>
        </div>
        </div>
    )
}