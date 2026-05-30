import React, {useState,} from "react";
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
        <>Название группы:&nbsp;
            
            { isOpened ? 
                <><div  className={"groupslist-group-changename-container-opened"}>
                    <input type={"text"} className={"groupslist-group-changename-input"} 
                    onFocus={(e)=> e.target.select()} value={groupName} 
                    onChange={ e => setNewGroupName(e.target.value)} 
                    disabled={isOpened ? null : "disabled"}
                    autoFocus />&nbsp;
                    <button className={"groupslist-group-changename-confirm-button groupslist-group-changename-confirm-button-agree"} onClick={confirmHandler}>&#10004;</button>
                    &nbsp;
                    <button className={"groupslist-group-changename-confirm-button groupslist-group-changename-confirm-button-disagree"}  onClick={() => setOpened(false)}>&#10006;</button>
                    
                </div>&nbsp;</> : 
                <>
                <div className={"groupslist-group-changename-container-closed"}>
                    <div  className={"groupslist-group-changename-input groupslist-group-changename-input-disabled"} disabled={"disabled"} ><p>{groupName}</p></div>
                    <button className={"groupslist-group-changename-openbutton"} onClick={() => setOpened(true)}>&#128221;</button>
                </div>&nbsp;
                </>
               
            }
        </>
    )

}