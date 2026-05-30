import React, {useEffect, useState, useRef} from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import FileLink from "./FileLink";
import Tasks from "./Tasks";
import ChangeTitle from "../CourseRedactor/ChangeTitle";
import ChangeContent from "../CourseRedactor/ChangeContent";
import DeleteContent from "../CourseRedactor/DeleteContent";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { changeLessonTitle, dropLesson } from "../../../../store/lessonsSlice";
import useScrollTo from "../../../../hooks/useScrollTo";
import "./lesson.css";


export default function Lesson({lessonId}) {

    console.log("lessonName")

    return(
        <div className={"lesson-wrap"} >
            <LessonContent lessonId={lessonId} />
            <div className={"lesson-tasks-container"}>
                <Tasks lessonId={lessonId} />
            </div>
        </div>
    )
}

function LessonContent({lessonId}) {


    const [isChangeContentOpened, setChangeContentOpening] = useState(false);
    
    const data = useSelector( state => {
        const lesson = state.lessons.lessons.find( lesson => lesson.id === lessonId);
        const {title, content, authorId, courseId} = lesson;
        return {title, content, authorId, courseId};
    }, shallowEqual)

    const dispatch = useDispatch()

    const {title, content, authorId, courseId} = data;

    const lessonRef = useRef(null);
    const lessonName = `lesson${lessonId}`;

    console.log(lessonName)

    const userId = useSelector( state => state.user.account.id );

    const changeTitle = (title)=> {
        dispatch(changeLessonTitle({courseId, lessonId, title}))
    }

    const cleanData = DOMPurify.sanitize(content.html);
    const reactContent = parse(cleanData);

    
    
    const FileLinks = content.files ? content.files.map( (data, i) => <FileLink data={data} key={"filelink" + lessonId + i} />) : null;

    console.log(isChangeContentOpened)

    useScrollTo(lessonRef, lessonName);

    return(
        <div className={"lesson-container"} ref={lessonRef}>
            <div className={"lesson-title-container"}>
            { userId === authorId ? 
                <ChangeTitle title={title} changeTitle={changeTitle}>
                    <h3 className={"lesson-title"}>{title}</h3>
                </ChangeTitle> :
                <h3 className={"lesson-title"}>{title}</h3>
            } 
            </div>
            { !isChangeContentOpened &&
                <>
                    <div  className={"lesson-content"}>{reactContent}</div>
                    <div  className={"lesson-files-container"}>{FileLinks}</div>
                </>
            }
            { userId === authorId && !isChangeContentOpened &&
                <div className={"lesson-menu"}>
                    <DeleteContent data={{courseId, contentId: content.id}}  callback={ ()=> dispatch(dropLesson({lessonId}))}>
                        <p className={"lesson-deletecontent-paragraph"}>Вы действительно хотите удалить урок "{title}"?</p>
                    </DeleteContent>
                    <button onClick={()=> {setChangeContentOpening(true)}} className={"lesson-menu-button lesson-menu-edit-button"}>Редактировать</button>
                </div> 
            }
            { isChangeContentOpened &&
                <ChangeContent data={{authorId, content, courseId, lessonId, files: content.files}} 
                    close={() => setChangeContentOpening(false)} key={"changeLessonContent" + content.id}/>
            }
        </div>
    )
}