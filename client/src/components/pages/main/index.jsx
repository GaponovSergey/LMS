import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../../../store/coursesSlice";
import Course from "./Course";
import { open } from "../../../store/popupSlice.js";


export default function Main() {

    const dispatch = useDispatch();
    const level= useSelector( state => state.user.level);
    const {courses, isCoursesLoaded } = useSelector( state => state.courses);

    useEffect( ()=> {
        if (!isCoursesLoaded) {
            dispatch(fetchCourses());
        }
    }, [isCoursesLoaded, dispatch])
        

    

    
    const coursesList = courses.map( (course, i) => <Course data={course} key={"course" + i} />)

    console.log(courses.length)


    return(
    <main>
        {
            coursesList.length ? coursesList : <p>Доступных курсов пока нет</p>
        }
        {
            level > 1 ? <button onClick={ ()=> dispatch(open({form: "courseForm"}))}>создать курс</button> : null
        }
    </main>
    )
}