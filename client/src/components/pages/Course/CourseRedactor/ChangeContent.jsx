import React, {useRef, useState} from "react";
import DOMPurify from "dompurify";
import Files from "../../../Form/Files";
import Redactor from "../../../Form/Redactor";
import { useDispatch } from "react-redux";
import { changeContent, updateContent } from "../../../../store/lessonsSlice";
import "./lectureForm.css";

const ChangeContent = ({data, children}) => {

    const [isOpened, setOpened] = useState(false);

    
   return(
        <>
            { !isOpened ? 
                <>
                    {children}
                    <button onClick={()=> setOpened(true)}>Редактировать</button>
                </> :

                <ContentForm data={data} close={ ()=> setOpened(false)}/>
            }
        </>
    )
}

function ContentForm({data, close}) {
    const { authorId, courseId, content, lessonId, taskId = null,  files = []} = data;
    const dispatch = useDispatch();

    const redactorRef = useRef(null);
    
    const cleanData = DOMPurify.sanitize(content.html);
    console.log("changeContent")
    console.log(cleanData)

    const filesState = useState({
        toDelete: [],
        exists: [...files],
        toCreate: [],
        toRemove: []
    })
    
    const handler = async ( ) => {
        const result = await dispatch(changeContent({
            authorId, courseId, 
            contentId: content.id,
            content: redactorRef.current.textContent,
            html: redactorRef.current.innerHTML,
            files: {
                toCreate: filesState[0].toCreate.map( file => file.id),
                toDelete: filesState[0].toDelete,
                toRemove: filesState[0].toRemove
            }
        }) )
        dispatch(updateContent({lessonId, taskId, ...result.payload}))
        close();
    };
    

    return(
        <>
            <div className={"task-form-redactor"}><Redactor ref={redactorRef} html={cleanData} /></div>
            <div className={"lecture-form-files-container"}>
                <Files  state={filesState}/> 
            </div>
            <div className={"lecture-form-button-container"}>
                <button className={"lecture-form-create-button"} onClick={() => handler()}>Сохранить</button>
                <button className={"lecture-form-create-button"} onClick={() => close()}>Отменить</button>
            </div> 
        </>
    )
}

export default ChangeContent;
