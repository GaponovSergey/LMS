import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../store/uploadSlice";
import { FileData } from "../pages/Course/Lesson/FileLink";
import "./file.css";


export default function File({data, upload = null, deleteFile, autoremove}) {

    const { name, storeId, size, lastModified } = data;
    const dispatch = useDispatch();

    const [isOnUploading, setUploading] = useState(false);
    const [isPopupOpened, setPopupOpening] = useState(false);
    const [withRemoving, setRemoving] = useState(autoremove)

    console.log("toCreate")
    console.log(data)

    useEffect(()=> { 

        if (isOnUploading) return;

        const effect = async () => {
            if (upload) {
                await dispatch(uploadFile({storeId, file: upload}))
                setUploading(true)
            }
        };

        effect();

    }, [upload])

    return(
        <div className={"inputedfile-container"}>
            
            {isPopupOpened && 
                <div className={"inputedfile-confirmdeletion-container"}>
                    <p>Подтвердите удаление файла <strong>{name}</strong>.</p>
                    {!autoremove &&
                        <p><div className={`checkbox-cell ${withRemoving && "checkbox-cell-on"}`} onClick={ ()=> setRemoving(!withRemoving)}><div className={`checkbox-mark ${withRemoving && "checkbox-mark-on"}`}></div></div> полностью удалить из хранилища файлов.</p>
                    }
                    <div className={"inputedfile-confirmdeletion-buttonscontainer"}>
                        <button className={"inputedfile-confirmdeletion-button inputedfile-confirmdeletion-button-accept"} onClick={ async ()=> {
                            await deleteFile(withRemoving);
                        }}>Подтверждаю</button>
                        <button className={"inputedfile-confirmdeletion-button inputedfile-confirmdeletion-button-reject"}  onClick={()=> setPopupOpening(false)}>Отмена</button>
                    </div>
                </div>
            }
            <div className={"inputedfile-data"}>
                <FileData data={data} />
            </div>
            <button className={"inputedfile-button-delete"} onClick={ ()=> setPopupOpening(true)}>&#x2716;</button>
            
            
        </div>
    );
}