import React from "react";
import { setValue, fetchLogup } from "../../store/logupSlice";
import { useSelector, useDispatch } from "react-redux";
import Input from "../Input";

export default function Logup() {

    const state = useSelector(state => state.logup);
    const { mail, password, repeatPassword, name, surname, fathername } = state;
    const dispatch = useDispatch();

    return(
        <div>
            <h3>Регистрация</h3>
            <div>
                <span>e-mail: </span><Input field={"mail"} state={mail} action={setValue} />
                <span>пароль: </span><Input type={"password"} field={"password"} state={password} action={setValue} />
                <span>повторите пароль: </span><Input type={"password"} field={"repeatPassword"} state={repeatPassword} action={setValue} />
                <span>Фамилия: </span><Input field={"surname"} state={surname} action={setValue} />
                <span>Имя: </span><Input field={"name"} state={name} action={setValue} />
                <span>Отчество: </span><Input field={"fathername"} state={fathername} action={setValue} />
            </div>
            <button onClick={ ()=> dispatch(fetchLogup({state}))}>Отправить</button>
        </div>
    )
}

