import React from "react";
import {useDispatch} from "react-redux";

export default function Textarea({state, field, action}) {
    const dispatch = useDispatch();
    return(
        <textarea defaultValue={state} onChange={ (e)=> dispatch(action({
            field,
            value: e.target.value
        }))} />
    )
}