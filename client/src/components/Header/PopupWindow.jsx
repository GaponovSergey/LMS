import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { close } from "../../store/popupSlice";
import Logup from "./Logup";
import Login from "./Login";


export default function PopupWindow() {

    const {form, isOpened} = useSelector( state => state.popup);
    const dispatch = useDispatch()

    return(
        <>
        { isOpened && 
            <div className="fixed-wrap">
                <div className="popup">
                    <button className="closebutton" onClick={()=> dispatch(close())}>&#x2716;</button>
                    { form === "logup" && <Logup /> }
                    { form === "login" && <Login /> }
                </div>
            </div>
        }
        </>
    )
}