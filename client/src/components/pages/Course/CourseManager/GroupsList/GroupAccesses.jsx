import React, {useState} from "react";
import GroupAccessesList from "./GroupAccessesList";
import { useDispatch, useSelector } from "react-redux";
import { changeGroupAccesses } from "../../../../../store/groupsSlice";

export default function GroupAccesses({groupId}) {

    const accessesState = useState([]);
    const [isDisabled, setDisabled] = useState(true);
    const courseId = useSelector( state => state.course.id)
    const dispatch = useDispatch();

    return(
        <>
            <GroupAccessesList accessesState={accessesState} groupId={groupId} disabled={isDisabled}/>
            <div>
                {isDisabled ? 
                    <button onClick={ ()=> {
                        setDisabled(false)
                    }}>Изменить</button> :
                    <>
                        <button onClick={ ()=> {
                            dispatch(changeGroupAccesses({courseId, accesses: accessesState[0]}));
                            setDisabled(true);
                        }}>Принять</button>
                        <button onClick={ ()=> {
                            setDisabled(true)
                        }}>Отмена</button>
                    </>
                }
            </div>
        </>
    )
}