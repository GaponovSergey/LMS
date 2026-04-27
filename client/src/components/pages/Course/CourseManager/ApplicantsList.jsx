import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicants } from "../../../../store/applySlice";
import Applicant from "./Applicant";
import SelectGroup from "./GroupsList/SelectGroup";


export default function ApplicantsList({course}) {

    const {applicants} = useSelector( state => state.apply );
    const dispatch = useDispatch();
    const [groupId, setGroup] = useState(null);

    useEffect( ()=> {
        dispatch(fetchApplicants(course));
    }, [course])
    
    const applicantsList = applicants.map((user )=> <Applicant user={user} groupId={groupId} course={course} key={`applicant${user.id}`}/>)

    return(
        <div>
            <div><p>Принимающая группа:</p>
                <SelectGroup setGroup={setGroup} />
            </div>
            <div><div>Список заявок на вступление на курс:</div><div>{applicantsList}</div></div>
        </div>
    )
}