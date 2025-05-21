import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourse } from "../../../store/courseSlice";
import CreateLesson from "./CreateLesson";
import Lecture from "./Lecture";


export default function Course() {

    const { courseId } = useParams();
    const dispatch = useDispatch();
    
    const user = useSelector( state => state.user );
    const state = useSelector( state => state.course );

    const lessons = state.lectures.map( lecture => <Lecture data={lecture} key={lecture.id} />)

    useEffect( ()=> {
            if (!state.isCourseLoaded) {
                dispatch(fetchCourse({courseId}));
            }
            
        }, [state.isCourseLoaded, courseId, dispatch]);

    
    return(
        <main>
            <h2>{state.title}</h2>
            <p>{state.description}</p>
            {lessons}
            { state.authorId === user.account.id ? 
                <CreateLesson /> : null 
            }
        </main>
    )
}