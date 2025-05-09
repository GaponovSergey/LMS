import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { close } from "../../store/popupSlice";
import Logup from "./Logup";
import Login from "./Login";
import CreateCourse from "./CreateCourse";


export default function PopupWindow() {

    const {form, isOpened} = useSelector( state => state.popup);
    const dispatch = useDispatch()

    return(
        <>
        { isOpened && 
            <div className="popup">
                <button onClick={()=> dispatch(close())}>Закрыть</button>
                { form === "logup" && <Logup /> }
                { form === "login" && <Login /> }
                { form === "courseForm" && <CreateCourse /> }
            </div>
        }
        </>
    )
}