import React from "react";
import { setValue } from "../../store/loginSlice";
import { fetchUser } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Input from "../Input";


export default function Login() {

    const { mail, password } = useSelector(state => state.login);
    const dispatch = useDispatch();

    return(
        <div>
            <h3>Вход</h3>
            <div>
                <span>e-mail: </span><Input field={"mail"} state={mail} action={setValue} />
                <span>пароль: </span><Input type={"password"} field={"password"} state={password} action={setValue} />
            </div>
            <button onClick={ () => dispatch(fetchUser({mail, password})) }>Отправить</button>
        </div>
    )
}

