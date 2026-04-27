import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCourseDescription } from "../../../../store/courseSlice";


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
                    <textarea value={newDescription} onChange={ e => setNewDescription(e.target.value)} />
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