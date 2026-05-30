import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicants } from "../../../../store/applySlice";
import Applicant from "./Applicant";
import SelectGroup from "./GroupsList/SelectGroup";
import "./applicants.css"


export default function ApplicantsList({course}) {

    const {applicants} = useSelector( state => state.apply );
    const dispatch = useDispatch();
    const [groupId, setGroup] = useState(null);

    useEffect( ()=> {
        dispatch(fetchApplicants(course));
    }, [course])
    
    const applicantsList = applicants.map((user )=> <Applicant user={user} groupId={groupId} course={course} key={`applicant${user.id}`}/>)

    return(
        <div className={"coursemanager-item-container"}>
            <div><p>Принимающая группа:</p>
                <SelectGroup setGroup={setGroup} />
            </div>
            <div><p>Список заявок на вступление на курс:</p><div className={"applicants-list"}>{applicantsList}</div></div>
        </div>
    )
}