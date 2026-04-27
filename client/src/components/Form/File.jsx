import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../store/uploadSlice";



export default function File({data, upload = null, deleteFile, autoremove}) {

    const { name, storeId, size, lastModified } = data;
    const dispatch = useDispatch();

    const [isOnUploading, setUploading] = useState(false);
    const [isPopupOpened, setPopupOpening] = useState(false);
    const [withRemoving, setRemoving] = useState(autoremove)

    console.log("toCreate")
    console.log(upload)

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
        <div>
            <div>
                <strong>{name}</strong>
                <p>размер: <i>{size}</i></p>
                <p>изменен: <i>{lastModified}</i></p>
            </div>
            <button onClick={ ()=> setPopupOpening(true)}>&#x2716;</button>
            {isPopupOpened && 
                <div>
                    <p>Подтвердите удаление файла <strong>{name}</strong>.</p>
                    {!autoremove &&
                        <p><button onClick={ ()=> setRemoving(!withRemoving)}>{withRemoving ? "galochka" : "netgalochki"}</button> полностью удалить из хранилища файлов.</p>
                    }
                    <button onClick={ async ()=> {
                        await deleteFile(withRemoving);
                    }}>Подтверждаю</button>
                    <button onClick={()=> setPopupOpening(false)}>Отмена</button>
                </div>
            }
        </div>
    );
}