import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { deleteContent } from "../../../../store/lessonsSlice";
import "./deleteContent.css";


export default function DeleteContent({data, callback = ()=>{}, children}) {

    const dispatch = useDispatch();
    const [isOpened, setOpened] = useState(false);

    return(
        <>
            <button onClick={()=> setOpened(true)} className={"lesson-menu-button lesson-menu-delete-button"}>Удалить</button>
            {isOpened &&
                <div className={"deletecontent-container"}>
                    {children}
                    <div className={"deletecontent-menu"}>
                        <button className={"deletecontent-menu-button deletecontent-menu-button-decline"} onClick={()=> setOpened(false)}>Нет</button>
                        <button className={"deletecontent-menu-button deletecontent-menu-button-accept"} onClick={ async ()=> {
                            await dispatch(deleteContent(data));
                            callback();
                        }}>Да</button>
                    </div>
                    
                </div>
            }
        </>
    )
}