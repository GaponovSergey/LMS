import React, {useState, useRef} from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import SelectGroup from "./SelectGroup";
import ChangeGroup from "./ChangeGroup";
import { changeGroup } from "../../../../../store/groupsSlice";


export default function GroupStudent({student, groupId}) {

    const {courseId} = useParams();

    const [isOpened, setOpening] = useState(false);
    const [groupState, setGroup] = useState(groupId);

    const dispatch = useDispatch();
    
    return(
        <div className={"groupslist-member"} >
            <p>{`${student.surname} ${student.name} ${student.fathername}`}</p>
            <div  className={"groupslist-member-changegroup-button-wrap"}>
                <button className={"groupslist-member-changegroup-button"} onMouseDown={()=> {setOpening(!isOpened)}}>Перевести в другую группу</button>
                {isOpened &&
                    <ChangeGroup studentId={student.id} groupId={groupId} close={()=> setOpening(!isOpened)}/>
                }
            </div>
            
        </div>
    )
}