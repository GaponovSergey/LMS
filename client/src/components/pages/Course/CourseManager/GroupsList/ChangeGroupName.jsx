import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeGroupName } from "../../../../../store/groupsSlice";


export default function ChangeGroupName({groupId, groupName}) {

    const [newGroupName, setNewGroupName] = useState(groupName);
    const courseId = useSelector( state => state.course.id);
    const [isOpened, setOpened] = useState(false);
    const dispatch = useDispatch();

    const confirmHandler = ()=>{
        if (newGroupName === groupName) {
            return setOpened(false);
        }
        if (!newGroupName) {
            return;
        }
        dispatch(changeGroupName({courseId, groupName: newGroupName, groupId}));
        setOpened(false);
    }

    return(
        <>
            
            <span>Назвнаие группы:</span>
            <input type={"text"} placeholder={groupName} onChange={ e => setNewGroupName(e.target.value)} disabled={isOpened ? null : "disabled"} />
            { isOpened ? 
                <>
                    <button onClick={confirmHandler}>&#10004;</button>
                    <button onClick={() => setOpened(false)}>&#10006;</button>
                </> : 
                <button onClick={() => setOpened(true)}>&#128221;</button>
            }
        </>
    )

}