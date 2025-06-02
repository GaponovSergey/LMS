import React from "react";
import { useDispatch } from "react-redux";
import { deleteFile } from "../../store/uploadSlice";


export default function File({data}) {

    const { name, size, lastModified} = data;
    const dispatch = useDispatch();

    return(
        <div>
            <div>
                <strong>{name}</strong>
                <p>размер: <i>{size}</i></p>
                <p>изменен: <i>{lastModified}</i></p>
            </div>
            <button onClick={ ()=> dispatch(deleteFile(data))}>&#x2716;</button>
        </div>
    );
}