import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogout } from "../../store/userSlice.js";
import { fetchCourseForm } from "../../store/createCourseSlice.js";
import PopupWindow from "./PopupWindow.jsx";
import Alert from "./Alert.jsx";
import { open } from "../../store/popupSlice.js";
import "./index.css";



export default function Header() {

    const level = useSelector( state => {
        console.log(state.user);
        return state.user.account.level});
    const dispatch = useDispatch();
    const [isCourseFormOpened, setCourseFormOpening] = useState(false);
    return(
        <header>
            <h1 onClick={()=> window.location.href = `/`}>СУО "Курс"</h1>
            <div className="header-buttonscontainer">
            { level ?
                <>
                    { level > 1 &&
                        <>
                        <button className={"courseform-openbutton"} onClick={()=> setCourseFormOpening(true)}>создать курс</button>
                        {isCourseFormOpened &&
                            <CourseForm close={()=> setCourseFormOpening(false)} />
                        }
                        </>
                    }
                    <button className="header_button" onClick={()=> dispatch(fetchLogout())}>выйти</button> 
                </>  
                 :
                <>
                    <button onClick={()=> dispatch(open({form: "login"}))} className="header_button-white">Вход</button>
                    <button onClick={() => dispatch(open({form: "logup"}))} className="header_button">Регистрация</button>
                </>
            }
            </div>
            <PopupWindow />
            <Alert />
        </header>
    );
}

function CourseForm({close}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const authorId = useSelector( state => state.user.account.id);
    const dispatch = useDispatch();

    return(
        <div className={"fixed-wrap"}>
            <div className="courseform-container">
                <button className="closebutton" onClick={()=> close()}>&#x2716;</button>
                <h4 className="courseform-title">Создание курса</h4>
                <p>Название курса:</p>
                <input type={"text"} onChange={(e)=> setTitle(e.target.value)}/>
                <p>Описание курса:</p>
                <textarea onChange={(e)=> setDescription(e.target.value)} />
                <button className="courseform-createbutton" 
                    onClick={ ()=> dispatch( fetchCourseForm({ title, description, authorId }) ) }>Создать</button>
            </div>
        </div>
    )
}