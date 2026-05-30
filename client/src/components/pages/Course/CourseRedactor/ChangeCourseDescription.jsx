import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCourseDescription } from "../../../../store/courseSlice";
import "./changeCourse.css";




export default function ChangeCourseDescription({children}) {

    
    const course = useSelector( state => state.course);
    const [newDescription, setNewDescription] = useState(course.description);
    const [isOpened, setOpened] = useState(false);
    const dispatch = useDispatch();

    const confirmHandler = ()=>{
        if (newDescription === course.description) {
            return setOpened(false);
        }
        if (!newDescription) {
            return;
        }
        dispatch(changeCourseDescription({courseId: course.id, description: newDescription}));
        setOpened(false);
    }

    return(
        <>
            { isOpened ? 
                <>
                    <textarea autoFocus={true} value={newDescription} className={"changecourse-description-input"}
                        onFocus={(e)=> e.target.select()} 
                        onChange={ e => setNewDescription(e.target.value)} />
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