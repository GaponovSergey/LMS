import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseContent } from "../../../../store/navigatorSlice";
import LessonLink from "./LessonLink";
import { triggerLink } from "../../../../store/navigatorSlice";
import "./index.css";

export default function Navigator({courseId, className = ""}) {

    const dispatch = useDispatch();
    

    const navState = useSelector( state => state.navigator);
    const user = useSelector( state => state.user );

    useEffect( ()=> {

        
            dispatch(getCourseContent({courseId}));
        
    }, [navState.isLessonsLoaded, courseId, dispatch])

    const withRedactor = navState.authorId === user.account.id;

    const lessonsList = navState.lessons.map( lesson => <LessonLink data={lesson} withRedactor ={ withRedactor } key={"lesson" + lesson.id} />);

    return(
        <div className={"navigator-wrap"}>
            <nav className={`navigator-container ${className}`}>
                {lessonsList}
                {withRedactor &&
                    <button className={"lesson-create-link-button"} onClick={()=> dispatch(triggerLink("createLesson"))}>Создать урок</button>
                }
            </nav>
        </div>
    )
}