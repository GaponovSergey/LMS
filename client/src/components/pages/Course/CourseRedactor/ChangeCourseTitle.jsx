import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCourseTitle } from "../../../../store/courseSlice";


export default function ChangeCourseTitle({children}) {

    
    const course = useSelector( state => state.course);
    const [newTitle, setNewTitle] = useState(course.title);
    const [isOpened, setOpened] = useState(false);
    const dispatch = useDispatch();

    const confirmHandler = ()=>{
        if (newTitle === course.title) {
            return setOpened(false);
        }
        if (!newTitle) {
            return;
        }
        dispatch(changeCourseTitle({courseId: course.id, title: newTitle}));
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