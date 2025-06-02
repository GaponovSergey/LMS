import React from "react";
import {useDispatch} from "react-redux";

export default function Radio({ value, action, name = "radio", checked = null}) {
    const dispatch = useDispatch();
    return(
        <input type="radio" name={ name } value={value} onClick={ (e)=> {
            dispatch(action({ value: e.target.value }));
        }} defaultChecked={ checked === value } />
    )
}