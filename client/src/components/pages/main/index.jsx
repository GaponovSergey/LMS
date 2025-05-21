import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../../../store/coursesSlice.js";
import Course from "./Course.jsx";
import { open } from "../../../store/popupSlice.js";
import "./index.css";


export default function Main() {

    const dispatch = useDispatch();
    const level= useSelector( state => state.user.account.level);
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
        <div className="coursesList">
            {
                coursesList.length ? coursesList : <p>Доступных курсов пока нет</p>
            }
        </div>
        
        {
            level > 1 ? <button onClick={ ()=> dispatch(open({form: "courseForm"}))}>создать курс</button> : null
        }
    </main>
    )
}