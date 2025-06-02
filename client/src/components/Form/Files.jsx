import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setFiles } from "../../store/uploadSlice";
import File from "./File";


export default function Files() {

    const dispatch = useDispatch();
    const {files, toCreate, toDelete} = useSelector(state => state.upload);

    console.log(toDelete);
    

    const getDroped = (e)=> {
        e.preventDefault();
        dispatch(setFiles({files: Array.from(e.dataTransfer.files)}));
        
    };

    const getInputed = (e)=> {
        e.preventDefault();
        
        dispatch(setFiles({files: Array.from(e.target.files)}));
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
            {toCreate.map( (file, index) => <File data={file} key={"file" + index}/>) || null}
            {files.map( (file, index)  => <File data={file} key={"file" + index}/>) || null}
        </div>
        </>
    )
}