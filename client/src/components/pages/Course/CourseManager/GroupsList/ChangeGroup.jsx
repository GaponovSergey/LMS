import React, {useState, useRef} from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import SelectGroup from "./SelectGroup";
import { changeGroup } from "../../../../../store/groupsSlice";
import useOnClickOutside from "../../../../../hooks/useOnClickOutside";


export default function ChangeGroup({studentId, groupId, close}) {

    const {courseId} = useParams();

    const [groupState, setGroup] = useState(groupId);

    const dispatch = useDispatch();
    const ref = useRef(null);

    useOnClickOutside(ref, ()=> close());
    
    return(
       
                <div className={"groupslist-member-changegroup-popup"} ref={ref}>
                    <SelectGroup setGroup={setGroup} outerValue={groupId} />
                    <button className={"groupslist-member-changegroup-confirmbutton"} onClick={async () => {
                        console.log("GroupStudent")
                        console.log({
                            courseId,
                            userId: studentId,
                            oldGroupId: groupId,
                            newGroupId: groupState
                        })
                        if (groupId === groupState || !groupState) return;

                        await dispatch(changeGroup({
                            courseId,
                            userId: studentId,
                            oldGroupId: groupId,
                            newGroupId: groupState
                        }));
                        close();
                    }}>➜</button>
                </div>
           
    )
}