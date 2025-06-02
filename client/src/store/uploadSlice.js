import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";

export const uploadFiles = createAsyncThunk(
    "upload/uploadFiles", async (_, {dispatch, getState}) => {
        try {
            const { upload, user } = getState();

            const files = upload.toCreate;
            const authorId = user.account.id;

            const body = {
                authorId,
                files: {
                    toCreate: files.map( file => { 
                        return {
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            lastModified: file.lastModified,
                            authorId
                        }
                    })
                }
            }


            const response = await fetch('http://127.0.0.1:3001/store/upload', {
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: "include",
                method: "POST",
                body: JSON.stringify(body)
            })

            const ids = await response.json();

            for(let i = 0; i < files.length; i++) {
                await fetch(`http://127.0.0.1:3001/store/upload/${authorId}`, {
                    headers:{
                        "Content-Type": files[i].type,
                        "X-File-Id": ids[i].storeId   
                    },
                    method: 'POST',
                    body: files[i]              
                }); 
            }

            return ids;
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));        
        }                
    }
)

const slice = createSlice({
    name: "upload",
    initialState: {
        files: [],
        toCreate: [],
        toDelete: []
    },
    reducers: {
        setFiles(state, action) {
            state.toCreate = [].concat(state.toCreate, action.payload.files);
        },
        deleteFile(state, action) {
            if(action.payload.storeId) {
               state.files = state.files.filter( file => file.storeId !== action.payload.storeId);
               state.toDelete.push(action.payload); 
            } else {
                state.toCreate = state.toCreate.filter( file => file.name !== action.payload.name || 
                                        file.lastModified !== action.payload.lastModified)
            }
            
        },
    }
})

export const { setFiles, deleteFile } = slice.actions;

export default slice.reducer;