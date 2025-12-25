import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setFiles, uploadFiles } from "../../store/uploadSlice";
import File from "./File";


export default function Files({to}) {

    const dispatch = useDispatch();
    const upload = useSelector(state => state.upload);

    const getDroped = (e)=> {
        e.preventDefault();
        dispatch(setFiles({to, files: Array.from(e.dataTransfer.files)}));
        dispatch(uploadFiles({to}));
    };

    const getInputed = (e)=> {
        e.preventDefault();
        
        dispatch(setFiles({to, files: Array.from(e.target.files)}));
        dispatch(uploadFiles({to}));
        e.target.value = null;
    };

    return(
        <>
        <div className="filesField">
            <input id="files" type="file" multiple onChange={getInputed} hidden={true} />
            <label htmlFor="files" className="dropField"
            onDragStart={(e)=> e.dataTransfer.clearData()}
            onDragOver={(e)=> e.preventDefault()} 
            onDrop={ getDroped }>
                
                    <p>Нажмите сюда, чтобы загрузить файл, или перенесите его в эту область.</p>
                
            </label>
        </div>
        <div>
            {upload[to].toCreate.map( (file, index) => <File data={{to, ...file}} key={"file" + index}/>) || null}
            {upload[to].files.map( (file, index)  => <File data={{to, ...file}} key={"file" + index}/>) || null}
        </div>
        </>
    )
}