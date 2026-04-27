import React, {useState} from "react";
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
        <div>
            <div>
                <span>{`${student.surname} ${student.name} ${student.fathername}`}</span>
                <button onClick={()=> setOpening(!isOpened)}>Перевести в другую группу</button>
            </div>
            {isOpened &&
                <ChangeGroup studentId={student.id} groupId={groupId} close={()=> setOpening(false)}/>
            }
        </div> 
    )
}