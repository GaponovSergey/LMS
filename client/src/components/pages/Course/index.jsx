import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourse } from "../../../store/courseSlice";
import CreateLesson from "./CreateLesson";
import Lecture from "./Lecture";


export default function Course() {

    const { courseId } = useParams();
    const dispatch = useDispatch();
    const [isOpened, setOpened] = useState(false);
    
    const user = useSelector( state => state.user );
    const state = useSelector( state => state.course );

    

    useEffect( ()=> {
            if (!state.isCourseLoaded) {
                dispatch(fetchCourse({courseId}));
            }
            
        }, [state.isCourseLoaded, courseId, dispatch]);

    const lessons = state.lectures.map( lecture => <Lecture data={lecture} key={lecture.id} />)

    
    return(
        <main>
            <h2>{state.title}</h2>
            <p>{state.description}</p>
            {lessons}
            { state.authorId === user.account.id && isOpened ? 
                <CreateLesson /> : 
                <button onClick={()=> setOpened(true)}>создать урок</button>
            }
            
        </main>
    )
}