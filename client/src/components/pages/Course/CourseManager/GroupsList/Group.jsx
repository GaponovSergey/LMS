import React, {useEffect, useState} from "react";
import GroupStudent from "./GroupStudent";
import GroupAccesses from "./GroupAccesses";
import ChangeGroupName from "./ChangeGroupName";
import { deleteGroup } from "../../../../../store/groupsSlice";
import { useDispatch } from "react-redux";


export default function Group({group, groupsCount = 0}) {

    const [isOpened, setGroupOpening] = useState(false);

    const {students, id: groupId, studentsCount, courseId, groupName} = group

    const groupStudents =  students ? students.map( student => <GroupStudent student={student} groupId={groupId} key={"groupstudent" + student.id} />) : null;
    
    return(
        <div>
            <div>
                <button onClick={()=> setGroupOpening(!isOpened)}>{isOpened ? "\u25BC" : "\u25BA"}</button>
                <span>{groupName}{`(${studentsCount})`}</span>
            </div>
            {isOpened &&
                <div>
                    <div>
                       <ChangeGroupName groupId={groupId} groupName={groupName} />
                       <DeleteGroup data={{groupId, courseId}} groupName={groupName} isDisabled={(groupsCount < 2 || !studentsCount)}/>
                    </div>

                    <GroupAccesses groupId={groupId} />
                    {groupStudents }
                </div>
                
            }
        </div>
    )
}

function DeleteGroup({data, groupName, isDisabled}) {

    const [isOpened, setOpened] = useState(false);

    const dispatch = useDispatch();

    return(
        <>
            <button onClick={()=> setOpened(true)} disabled={isDisabled ? "disabled" : null}>Удалить группу</button>
            {isOpened &&
                <div>
                    <p>Вы действительно желаете удалить группу "{groupName}"?</p>
                    <button onClick={ ()=> setOpened(false)}>Нет</button>
                    <button onClick={ ()=> {
                        dispatch(deleteGroup(data))
                    }}>Да</button>
                </div>

            }
        </>
    )
}