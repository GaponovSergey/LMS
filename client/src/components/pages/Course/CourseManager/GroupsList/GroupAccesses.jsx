import React, {useState} from "react";
import GroupAccessesList from "./GroupAccessesList";
import { useDispatch, useSelector } from "react-redux";
import { changeGroupAccesses } from "../../../../../store/groupsSlice";
import "./groupAccesses.css";

export default function GroupAccesses({groupId}) {

    const accessesState = useState([]);
    const [isDisabled, setDisabled] = useState(true);
    const courseId = useSelector( state => state.course.id)
    const dispatch = useDispatch();

    return(
        <div className={"groupaccesses-container"}>
            <p>Доступ к заданиям:</p>
            <div className={"groupaccesses-list"}>
                <GroupAccessesList accessesState={accessesState} groupId={groupId} disabled={isDisabled}/>
            </div>
            <div className="groupaccesses-buttons-container">
                {isDisabled ? 
                    <button className={"groupaccesses-button "} onClick={ ()=> {
                        setDisabled(false)
                    }}>Изменить</button> :
                    <>
                        <button className={"groupaccesses-button groupaccesses-button-accept"} onClick={ ()=> {
                            dispatch(changeGroupAccesses({courseId, accesses: accessesState[0]}));
                            setDisabled(true);
                        }}>Принять</button>
                        <button className={"groupaccesses-button groupaccesses-button-reject"} onClick={ ()=> {
                            setDisabled(true)
                        }}>Отмена</button>
                    </>
                }
            </div>
        </div>
    )
}