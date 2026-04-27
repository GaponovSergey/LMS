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
    <div>
        <button onClick={()=> setFormOpening(!isFormOpened)}>{!isFormOpened && "Добавить группу" || "Скрыть"}</button>
        {isFormOpened && 
            <div>
                <p>Название:</p>
                <input type={"text"} onChange={ e => setTitle(e.target.value)} />
                <p>Настройки доступа:</p>
                <GroupAccessesList accessesState={accesses} />
                <button onClick={ ()=> {
                    dispatch(addGroup({groupName: title, accesses: accesses[0], ...course}));
                    setFormOpening(false);
                }}>Создать</button>
            </div> 
        }
    </div>
        
    )
}