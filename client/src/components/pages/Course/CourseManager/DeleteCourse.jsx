import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../../store/courseSlice";
import "./courseSettings.css";


export default function DeleteCourse({data}) {

    const dispatch = useDispatch();
    const [isOpened, setOpened] = useState(false);

    return(
        <>
            <button className={"coursesettings-deletebutton"} onClick={()=> setOpened(true)}>Удалить курс</button>
            {isOpened &&
                <div className={"deletecontent-container"}>
                    <p>Вы действительно желаете удалить данный курс?</p>
                    <div className={"deletecontent-menu"}>
                        <button className={"deletecontent-menu-button deletecontent-menu-button-decline"} onClick={()=> setOpened(false)}>Нет</button>
                        <button className={"deletecontent-menu-button deletecontent-menu-button-accept"} onClick={ async ()=> {
                            await dispatch(deleteCourse(data));
                        }}>Да</button>
                    </div>
                </div>
            }
        </>
    )
}