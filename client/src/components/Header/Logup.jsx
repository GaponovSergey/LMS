import React, {useState} from "react";
import { fetchLogup } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import InputText from "../Form/InputText";

export default function Logup() {

    const dispatch = useDispatch();

    const [mailState, setMailState] = useState({isValid: false, value: ""});
    const [passState, setPassState] = useState({isValid: false, value: ""});
    const [rePassState, setRePassState] = useState({isValid: false, value: ""});
    const [surnameState, setSurnameState] = useState({isValid: false, value: ""});
    const [nameState, setNameState] = useState({isValid: false, value: ""});
    const [fathernameState, setFathernameState] = useState({isValid: false, value: ""});

    return(
        
        <div className="popup_form">
            <h3>Регистрация</h3>
            <div className="popup_form">
                <p><span>e-mail: </span><InputText type={"email"} setState={setMailState} validation={{
                                        minLength: 5,
                                        mask: new RegExp(/^\w+@\w+\.\w+$/), 
                                        maskError: "введенная строка не является e-mail"
                                    }}/></p>
                <p><span>пароль: </span><InputText type={"password"} setState={setPassState} validation={{
                                        minLength: 2
                                    }}/></p>
                <p><span>повторите пароль: </span><InputText type={"password"} setState={setRePassState} validation={{
                                        minLength: 2,
                                        repeat: passState.value
                                    }}/></p>
                <p><span>Фамилия: </span><InputText type={"text"} setState={setSurnameState} validation={{
                                        minLength: 1
                                    }}/></p>
                <p><span>Имя: </span><InputText type={"text"} setState={setNameState} validation={{
                                        minLength: 1
                                    }}/></p>
                <p><span>Отчество: </span><InputText type={"text"} setState={setFathernameState} validation={{
                                        minLength: -1
                                    }}/></p>
            </div>
            <button
                disabled={(!mailState.isValid || !passState.isValid || !rePassState.isValid || !nameState.isValid || !surnameState.isValid) ? "disabled" : ""}  
                className={"header_button popup_button"} 
                onClick={ ()=> dispatch(fetchLogup({ 
                    mail: mailState.value, 
                    password: passState.value,
                    name: nameState.value, 
                    surname: surnameState.value, 
                    fathername: fathernameState.value 
                }))}>Отправить</button>
        </div>
    )
}

