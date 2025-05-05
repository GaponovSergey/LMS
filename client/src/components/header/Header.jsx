import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice.js";
import PopupWindow from "./PopupWindow.jsx";
import {openLogin, openLogup} from "../../store/popupSlice.js"



export default function Header() {

    const level = useSelector( state => state.user.level);
    const dispatch = useDispatch();
    return(
        <header>
            { level ?  
                <button onClick={()=> dispatch(logout())}>выйти</button>  :
                <>
                    <button onClick={()=> dispatch(openLogin())} className="header_button-white">Вход</button>
                    <button onClick={() => dispatch(openLogup())} className="header_button">Регистрация</button>
                </>
            }
            <PopupWindow />
        </header>
    );
}