import React from "react";
import { useDispatch } from "react-redux";
import "./fileLink.css";


export default function FileLink({data}) {

    let { name, size, lastModified, storeId, authorId, } = data;
    const dispatch = useDispatch();

    const dateString = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });


    return(
        
            <div className={"file-link-container"}>
                <a className={"file-link"} href={`http://localhost:3001/store/${authorId}/${storeId}`} target={"_blank"}>{name}</a>
                <p>размер: <i>{defineSize(size)}</i></p>
                <p>изменен: <i>{dateString.format(new Date(lastModified)) }</i></p>
            </div>
        
    );
}

function defineSize(size, i = 0) {
        
        if( !size) return;
        const bytes = ["байт", "КБайт", "МБайт", "ГБайт"];
        
        console.log(size, i)
        if (size < 500 || i >= bytes.length - 1) {
            const res = size.toFixed(2) + " " + bytes[i];
            console.log(res)
            return res;
        }
        else {
            size = +size / 1024;
            return defineSize(size, ++i ); 
        }
    }