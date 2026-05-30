import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLessonTitle } from "../../../../store/courseSlice";
import "./changeTitle.css";


export default function ChangeTitle({title, changeTitle, children}) {

    
    const [newTitle, setNewTitle] = useState(title);
    const [isOpened, setOpened] = useState(false);

    const confirmHandler = ()=>{
        if (newTitle === title) {
            return setOpened(false);
        }
        if (!newTitle) {
            return;
        }
        changeTitle(newTitle);
        setOpened(false);
    }

    return(
        <>
            { isOpened ? 
                <>
                    <input className={"changetitle-input"} 
                        onFocus={(e)=> e.target.select()}  autoFocus={true} type={"text"} value={newTitle} onChange={ e => setNewTitle(e.target.value)} />
                    <div className={"changetitle-buttons-container"}>
                        <button className={"changetitle-confirm-button changetitle-confirm-button-agree"} onClick={confirmHandler}>&#10004;</button>
                        <button className={"changetitle-confirm-button changetitle-confirm-button-disagree"} onClick={() => setOpened(false)}>&#10006;</button>
                    </div>
                    
                </> : 
                <>
                {children}
                <button className={"changetitle-open-button"} onClick={() => setOpened(true)}>&#128221;</button>
                </>
            }
        </>
    )

}