import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {close} from "../../store/alertSlice";


export default function Alert() {

    const {title, content, isOpened} = useSelector( state => state.alert);  
    const dispatch = useDispatch();

    return(
        <>
        {isOpened &&
            <div className="popup">
                <h3>{title}</h3>
                <p>{content}</p>
                <button className="header_button" onClick={ ()=> dispatch(close())}>принято</button>
            </div>
        }
        </>  
    )

}