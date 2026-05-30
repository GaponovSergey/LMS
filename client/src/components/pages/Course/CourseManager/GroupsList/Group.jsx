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
        <div className={"groupslist-list-item-wrap"}>
            <div  className={"groupslist-list-item"}>
                <button  className={"groupslist-list-item-button"} onClick={()=> setGroupOpening(!isOpened)}>{isOpened ? "\u25BC" : "\u25BA"}</button>
                <p className="groupslist-list-item-title">{groupName}{`(${studentsCount})`}</p>
            </div>
            {isOpened &&
                <div className={"groupslist-group-container"}>
                    <div className="groupslist-group-changename-container">
                       <ChangeGroupName groupId={groupId} groupName={groupName} />
                       <DeleteGroup data={{groupId, courseId}} groupName={groupName} isDisabled={(groupsCount < 2 || !studentsCount)}/>
                    </div>

                    <GroupAccesses groupId={groupId} />
                    <p className={"groupslist-groupmembers-title"}>Список учеников группы:</p>
                    <div className={"groupaccesses-list"}>
                        {groupStudents }
                    </div>
                    
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
            <button className={"groupslist-group-deletebutton"} onClick={()=> setOpened(true)} disabled={isDisabled ? "disabled" : null}>Удалить группу</button>
            {isOpened &&
                <div className={"deletecontent-container"}>
                    <p>Удалить группу "{groupName}"?</p>
                    <div className={"deletecontent-menu"}>
                        <button className={"deletecontent-menu-button deletecontent-menu-button-decline"} onClick={ ()=> setOpened(false)}>Нет</button>
                        <button className={"deletecontent-menu-button deletecontent-menu-button-accept"} onClick={ ()=> {
                            dispatch(deleteGroup(data))
                        }}>Да</button>
                    </div>
                    
                </div>

            }
        </>
    )
}