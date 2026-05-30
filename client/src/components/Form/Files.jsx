import React, { useState } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setFiles, uploadFilesData } from "../../store/uploadSlice";
import File from "./File";


export default function Files({state, autoremove = false}) {

    const dispatch = useDispatch();
    const [filesState, setFilesState] = state; // fileState = {exists: [...], toCreate: [...], toDelete: [...]}
    const [filesToUpload, setFilesToUpload] = useState([])

    const mapFileData = file => {
            
        return {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        };
    };

    const getDroped = async (e)=> {
        e.preventDefault();

        const files = Array.from(e.dataTransfer.files)

        setFilesToUpload([...filesToUpload, ...files]);

        const filesData = files.map(mapFileData);

        const result = await dispatch(uploadFilesData(filesData));
        

        setFilesState({
            ...filesState,
            toCreate: [...filesState.toCreate, ...result.payload]
        });
    };

    const getInputed = async (e)=> {
        e.preventDefault();
        
        const files = Array.from(e.target.files)

        setFilesToUpload([...filesToUpload, ...files]);

        const filesData = files.map(mapFileData);

        const result = await dispatch(uploadFilesData(filesData));

        setFilesState({
            ...filesState,
            toCreate: [...filesState.toCreate, ...result.payload]
        });

        e.target.value = null;
    };

    const deleteExistingFile = ({id, storeId})=>{
        return (withRemoving) => {
            const filteredState = filesState.exists.filter( file => file.storeId !== storeId);
            setFilesState({
                ...filesState,
                toDelete: [...filesState.toDelete, id],
                exists: [...filteredState],
                toRemove: withRemoving ? [...filesState.toRemove, storeId] : [...filesState.toRemove]
            })
        }
    }

    const deleteCreatedFile = ({storeId}) => {
        return (withRemoving) => {
            const filteredState = filesState.toCreate.filter( file => file.storeId !== storeId);
            setFilesState({
                ...filesState,
                toCreate: [...filteredState],
                toRemove: withRemoving ? [...filesState.toRemove, storeId] : [...filesState.toRemove]
            })
        }
    }

    const findToUpload = (file) => {
        return (fileToUpload) => {

            console.log("findtoupload")
            console.log(file)
            console.log(fileToUpload)
            const lastModified = new Date(file.lastModified)

            if (
                fileToUpload.name == file.name &&
                fileToUpload.size == file.size &&
                fileToUpload.lastModified == lastModified.getTime() &&
                fileToUpload.type == file.type
            ) {
                return fileToUpload;
            }
        };
    }

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
        <div className={"inputedfiles-container"}>
            {
                filesState.exists.map( file => <File data={file} autoremove={autoremove} deleteFile={deleteExistingFile(file)} key={"fileForm" + file.storeId}/>) || 
                null
            }
            {
                filesState.toCreate.map( file => <File data={file} autoremove={autoremove} 
                    upload={filesToUpload.find(findToUpload(file))} 
                    deleteFile={deleteCreatedFile(file)}  key={"fileForm" + file.storeId}/>) || 
                null
            }
        </div>
        </>
    )
}