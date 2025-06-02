import React from "react";
import { setValue } from "../../store/loginSlice";
import { fetchUser } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Input from "../Form/Input";


export default function Login() {

    const { mail, password } = useSelector(state => state.login);
    const dispatch = useDispatch();

    return(
        <div className="popup_form">
            <h3>Вход</h3>
            <div className="popup_form">
                <p><span>e-mail: </span><Input field={"mail"} state={mail} action={setValue} /></p>
                <p><span>пароль: </span><Input type={"password"} field={"password"} state={password} action={setValue} /></p>
            </div>
            <button className="header_button popup_button" onClick={ () => dispatch(fetchUser({mail, password})) }>Отправить</button>
        </div>
    )
}

