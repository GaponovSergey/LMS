import React from "react";
import { useDispatch } from "react-redux";
import { triggerLink } from "../../../../store/navigatorSlice";

export default function TaskLink({data}) {

    const dispatch = useDispatch();
    const {id, title} = data;
    const navName = `task${id}`;

    return(
        <button className={"task-link-button"} onClick={()=> dispatch(triggerLink(navName))}>
            {title}
        </button>
    )
}