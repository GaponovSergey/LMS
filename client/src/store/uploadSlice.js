import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";

export const uploadFiles = createAsyncThunk(
    "upload/uploadFiles", async ({to}, {dispatch, getState}) => {
        try {
            const { upload, user } = getState();

            const files = upload[to].toCreate;
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

            dispatch(reloadFiles({to, files: ids}))

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
        lecture: {
            files: [],
            toCreate: [],
            toDelete: []
        },
        task: {
            files: [],
            toCreate: [],
            toDelete: []
        }
    },
    reducers: {
        setFiles(state, action) {

            const to = action.payload.to;

            state[to].toCreate = [].concat(state[to].toCreate, action.payload.files);
        },
        reloadFiles(state, action) {

            const to = action.payload.to;

            state[to].toCreate = action.payload.files;
        },
        deleteFile(state, action) {

            const to = action.payload.to;

            if(action.payload.storeId) {
               state[to].files = state[to].files.filter( file => file.storeId !== action.payload.storeId);
               state[to].toDelete.push(action.payload); 
            } else {
                state[to].toCreate = state[to].toCreate.filter( file => file.name !== action.payload.name || 
                                        file.lastModified !== action.payload.lastModified)
            }
            
        },
    }
})

export const { setFiles, reloadFiles, deleteFile } = slice.actions;

export default slice.reducer;