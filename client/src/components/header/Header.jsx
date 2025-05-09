import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice.js";
import PopupWindow from "./PopupWindow.jsx";
import { open } from "../../store/popupSlice.js"



export default function Header() {

    const level = useSelector( state => state.user.level);
    const dispatch = useDispatch();
    return(
        <header>
            { level ?  
                <button onClick={()=> dispatch(logout())}>выйти</button>  :
                <>
                    <button onClick={()=> dispatch(open({form: "login"}))} className="header_button-white">Вход</button>
                    <button onClick={() => dispatch(open({form: "logup"}))} className="header_button">Регистрация</button>
                </>
            }
            <PopupWindow />
        </header>
    );
}