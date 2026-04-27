import React from "react";

export default function Radio({ value, setState, name = "radio", checked = false}) {
    return(
        <input type="radio" name={ name } value={value} onClick={ (e)=> {
            setState( e.target.value );
        }} defaultChecked={ checked } />
    )
}