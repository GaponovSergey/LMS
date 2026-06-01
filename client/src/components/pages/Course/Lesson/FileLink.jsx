import React from "react";
import { useDispatch } from "react-redux";
import "./fileLink.css";
import path from "../../../../store/config";


export default function FileLink({data}) {


    return(
        
            <div className={"file-link-container"}>
                <FileData data={data} />
            </div>
        
    );
}

export function FileData({data}) {

    let { name, size, createdAt, storeId, authorId, courseId } = data;

    const dateString = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });

    return(
        
            <>
                <a className={"file-link"} href={`${path}/store/${courseId}/${storeId}`} target={"_blank"}>{name}</a>
                <p>размер: <i>{defineSize(size)}</i></p>
                <p>добавлен: <i>{dateString.format(new Date(createdAt)) }</i></p>
            </>
        
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