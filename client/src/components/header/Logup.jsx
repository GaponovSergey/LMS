import React from "react";
import { setValue, fetchLogup } from "../../store/logupSlice";
import { useSelector, useDispatch } from "react-redux";
import Input from "../Form/Input";

export default function Logup() {

    const state = useSelector(state => state.logup);
    const { mail, password, repeatPassword, name, surname, fathername } = state;
    const dispatch = useDispatch();

    return(
        <div className="popup_form">
            <h3>Регистрация</h3>
            <div className="popup_form">
                <p><span>e-mail: </span><Input field={"mail"} state={mail} action={setValue} /></p>
                <p><span>пароль: </span><Input type={"password"} field={"password"} state={password} action={setValue} /></p>
                <p><span>повторите пароль: </span><Input type={"password"} field={"repeatPassword"} state={repeatPassword} action={setValue} /></p>
                <p><span>Фамилия: </span><Input field={"surname"} state={surname} action={setValue} /></p>
                <p><span>Имя: </span><Input field={"name"} state={name} action={setValue} /></p>
                <p><span>Отчество: </span><Input field={"fathername"} state={fathername} action={setValue} /></p>
            </div>
            <button className="header_button popup_button" onClick={ ()=> dispatch(fetchLogup(state))}>Отправить</button>
        </div>
    )
}

