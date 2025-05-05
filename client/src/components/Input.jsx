import React from "react";
import {useDispatch} from "react-redux";

export default function Input({type = "text", state, field, action}) {
    const dispatch = useDispatch();
    return(
        <input type={type} defaultValue={state} onChange={ (e)=> dispatch(action({
            field,
            value: e.target.value
        }))} />
    )
}