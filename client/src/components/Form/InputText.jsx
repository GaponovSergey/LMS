import React, {useState} from "react";
import "./inputText.css";


export default function InputText({type = "text", setState, className = "", 
    validation = {
        minLength: 0,
        maxLength: 40,
        repeat: null,
        mask: null,
        maskError: ""
    }
}) {

    const [validState, setValidState] = useState({isValid: true, message: ""})

    const checkValidation = (string) => {
        const {minLength = 0, maxLength = 40, repeat = null, mask = null, maskError = ""} = validation;

        if (string.length <= minLength) return { isValid: false, message: `длина должна быть более ${minLength} символов`};
        if (string.length > maxLength) return { isValid: false, message: `длина должна быть не более ${maxLength} символов`};
        if (mask && !mask.test(string)) return { isValid: false, message: maskError};
        if (repeat && repeat !== string) return { isValid: false, message: `соответствия нет`};

        return { isValid: true, message: null};
    }

    const changeHandler = (e) => {

        const value = e.target.value;
        const validation = checkValidation(value);
        
        setState({value, isValid: validation.isValid});
        setValidState(validation);

    }
    

    return(
        <div className={`form-input-container ${!validState.isValid ? "form-input-container-invalid" : ""}`}>
            <input 
                type={type}  
                className={className || "form-input"} 
                onChange={changeHandler}
            />
            {!validState.isValid &&
                <p className="form-input-invalidmessage">{validState.message}</p>
            }
        </div>
    )
}