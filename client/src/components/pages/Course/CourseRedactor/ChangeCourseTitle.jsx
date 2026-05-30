import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCourseTitle } from "../../../../store/courseSlice";
import "./changeCourse.css";

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
                    <textarea autoFocus={true} value={newTitle} className={"changecourse-title-input"} 
                        onFocus={(e)=> e.target.select()} 
                        onChange={ e => setNewTitle(e.target.value)} />
                    <div className={"changecourse-buttons-container"}>
                        <button className={"changecourse-confirm-button changecourse-confirm-button-agree"} onClick={confirmHandler}>&#10004;</button>
                        <button className={"changecourse-confirm-button changecourse-confirm-button-disagree"} onClick={() => setOpened(false)}>&#10006;</button>
                    </div>
                    
                </> : 
                <>
                {children}
                <button className={"changecourse-open-button"} onClick={() => setOpened(true)}>&#128221;</button>
                </>
            }
        </>
    )

}