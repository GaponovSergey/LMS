import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLessonTitle } from "../../../../store/courseSlice";


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
                    <input type={"text"} value={newTitle} onChange={ e => setNewTitle(e.target.value)} />
                    <button onClick={confirmHandler}>&#10004;</button>
                    <button onClick={() => setOpened(false)}>&#10006;</button>
                </> : 
                <>
                {children}
                <button onClick={() => setOpened(true)}>&#128221;</button>
                </>
            }
        </>
    )

}