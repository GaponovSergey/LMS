import React, {useState} from "react";
import { useDispatch } from "react-redux";
import GroupAccessesList from "./GroupAccessesList";
import { addGroup } from "../../../../../store/groupsSlice";

export default function CreateGroup({course}) {


    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [isFormOpened, setFormOpening] = useState(false);
    const accesses = useState([]);

    return(
    <div className={"groupslist-creategroup-wrap"}>
        <button className={"groupslist-creategroup-button"} onClick={()=> setFormOpening(!isFormOpened)}>
            {!isFormOpened && "\u25BA Добавить группу" || "\u25BC Скрыть"}
        </button>
        {isFormOpened && 
            <div className={"groupslist-creategroup-container"}>
                <div className={"groupslist-creategroup-title"}>
                    <p>Название:</p>
                    <input type={"text"} onChange={ e => setTitle(e.target.value)} />
                </div>
                
                <p>Настройки доступа:</p>
                <div className={"groupaccesses-list"}>
                    <GroupAccessesList accessesState={accesses} />
                </div>
                <button className={"groupslist-creategroup-createbutton"} onClick={ ()=> {
                    dispatch(addGroup({groupName: title, accesses: accesses[0], ...course}));
                    setFormOpening(false);
                }}>Создать</button>
            </div> 
        }
    </div>
        
    )
}