import React, {useState} from "react";
import "./inputDeadline.css";



export default function InputDeadline({formState}) {

    const setMinDateValue = ()=> {
        return getDatetoInputValue(new Date());
    }

    const [state, setState] = formState;
    const [deadline, setDeadline] = useState(state || setMinDateValue());
    const [isDisabled, setDisabled] = useState(!state)

    return(
        <>
            <p className={`deadline-string ${isDisabled && "deadline-string-disabled" }`}>
                    <div onClick={()=> {
                        if (isDisabled) {
                           setDisabled(false)
                            if (!state) {
                                setState(deadline);
                            } 
                        } else {
                            setDisabled(true);
                            setState(null);
                        }
                        
                    }} className={`checkbox-cell ${!isDisabled && "checkbox-cell-on" }`}>
                        <div className={`checkbox-mark ${!isDisabled && "checkbox-mark-on" }`}></div>
                    </div> 
                  &nbsp;Установить срок сдачи:&nbsp; 
                    <input type={"datetime-local"} defaultValue={deadline} onChange={(e)=> {
                        setDeadline(e.target.value);
                        setState(e.target.value);
                    }} disabled={isDisabled ? "disabled" : ""} min={setMinDateValue()} />
            </p>
        </>
    )
}

export const getDatetoInputValue = (date) => {

        const setNull = (number)=> {
            return number < 10 ? "0" + number : "" + number;
        }
        
        const datestring =  `${date.getFullYear()}-${setNull(date.getMonth() + 1)}-${setNull(date.getDate())}T${setNull(date.getHours())}:${setNull(date.getMinutes())}`
        return datestring;
    }