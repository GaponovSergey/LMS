import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { deleteContent } from "../../../../store/lessonsSlice";


export default function DeleteContent({data, callback = ()=>{}, children}) {

    const dispatch = useDispatch();
    const [isOpened, setOpened] = useState(false);

    return(
        <>
            <button onClick={()=> setOpened(true)}>Удалить</button>
            {isOpened &&
                <div>
                    {children}
                    <button onClick={()=> setOpened(false)}>Нет</button>
                    <button onClick={ async ()=> {
                        await dispatch(deleteContent(data));
                        callback();
                    }}>Да</button>
                </div>
            }
        </>
    )
}