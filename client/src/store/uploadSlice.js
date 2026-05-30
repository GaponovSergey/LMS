import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";
import path from "./config";

export const uploadFilesData = createAsyncThunk( "upload/uploadFilesData",
    async (files, {dispatch, getState}) => {
        try {

            const { user } = getState();
            const { course } = getState();

            const courseId = course.id;

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
                            authorId, courseId
                        }
                    })
                }
            }

            console.log("uploadFilesData")
            console.log(body)

            const response = await fetch(`${path}/store/uploadFilesData`, {
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
                    credentials: "include",
                    method: "POST",
                    body: JSON.stringify(body)
            })

            return await response.json();

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));  
        }

    }
)

export const uploadFile = createAsyncThunk( "upload/uploadFile", async ({storeId, file}, { dispatch, getState})=> {
    try {

        const { course: {id: courseId } } = getState();

        console.log("uploadFile")

        const response = await fetch(`${path}/store/upload/uploadFile`, {
            headers:{
                "Content-Type": file.type,
                "X-File-Id": storeId,
                "X-Course-Id": courseId    
            },
            method: 'POST',
            body: file              
        }); 

        return response.ok;

    } catch(err) {
        let content = err.message;
        dispatch(setAlert({title: "Ошибка", content}));  
    }
})

export const uploadFiles = createAsyncThunk(
    "upload/uploadFiles", async ({to}, {dispatch, getState}) => {
        try {
            const { upload, user } = getState();

            const files = upload[to].toCreate;
            const authorId = user.account.id;

            console.log("uploadFiles")

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


            const response = await fetch(`${path}/store/upload`, {
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: "include",
                method: "POST",
                body: JSON.stringify(body)
            })

            const ids = await response.json();

            for(let i = 0; i < files.length; i++) {
                await fetch(`${path}/store/upload/${authorId}`, {
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