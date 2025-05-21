import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogout } from "../../store/userSlice.js";
import PopupWindow from "./PopupWindow.jsx";
import { open } from "../../store/popupSlice.js";
import "./index.css";



export default function Header() {

    const level = useSelector( state => {
        console.log(state.user);
        return state.user.account.level});
    const dispatch = useDispatch();
    return(
        <header>
            { level ?  
                <button className="header_button" onClick={()=> dispatch(fetchLogout())}>выйти</button>  :
                <>
                    <button onClick={()=> dispatch(open({form: "login"}))} className="header_button-white">Вход</button>
                    <button onClick={() => dispatch(open({form: "logup"}))} className="header_button">Регистрация</button>
                </>
            }
            <PopupWindow />
        </header>
    );
}