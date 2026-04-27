import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../../store/courseSlice";


export default function DeleteCourse({data}) {

    const dispatch = useDispatch();
    const [isOpened, setOpened] = useState(false);

    return(
        <>
            <button onClick={()=> setOpened(true)}>Удалить</button>
            {isOpened &&
                <div>
                    <p>Вы действительно желаете удалить данный курс?</p>
                    <button onClick={()=> setOpened(false)}>Нет</button>
                    <button onClick={ async ()=> {
                        await dispatch(deleteCourse(data));
                    }}>Да</button>
                </div>
            }
        </>
    )
}