import React, {useState} from "react";
import { fetchUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import InputText from "../Form/InputText";


export default function Login() {

    const dispatch = useDispatch();

    const [mailState, setMailState] = useState({isValid: false, value: ""});
    const [passState, setPassState] = useState({isValid: false, value: ""});

    return(
        <div className="popup_form">
            <h3>Вход</h3>
            <div className="popup_form">
                <p><span>e-mail: </span><InputText type={"email"} setState={setMailState} validation={{
                        minLength: 5,
                        mask: new RegExp(/^\w+@\w+\.\w+$/), 
                        maskError: "введенная строка не является e-mail"
                    }}/></p>
                <p><span>пароль: </span><InputText type={"password"} setState={setPassState} validation={{
                        minLength: 2
                    }}/></p>
            </div>
            <button 
                disabled={(!mailState.isValid || !passState.isValid) ? "disabled" : ""} 
                className={"header_button popup_button"} 
                onClick={ () => dispatch(fetchUser({mail: mailState.value, password: passState.value})) }>Отправить</button>
        </div>
    )
}

