import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toggleCourseLoading } from "./courseSlice";
import { uploadFiles } from "./uploadSlice";
import { setAlert } from "./alertSlice";

export const fetchLessonForm = createAsyncThunk("createLesson/fetchLessonForm",
    
    async ({lessonType, data}, { dispatch })=> {
        try {
        const { payload } = await dispatch(uploadFiles());

        data.files = payload.map( file => {return {fileId: file.id};});
        const response = await fetch(`http://127.0.0.1:3001/${lessonType}s/`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include', 
            method: "POST",
            body: JSON.stringify(data)
        });
    if ( response.ok ) {
        
        dispatch( toggleCourseLoading() );
    }
    } catch(err) {
        let content = err.message;
        dispatch(setAlert({title: "Ошибка", content}))
    }
})

const slice = createSlice({
    name: "createLesson",
    initialState: {
        title: null,
        content: null,
        lessonType: "lecture",
        files: [],
        isOpened: false
    }, 
    reducers: {
        setValue(state, action) {
            state[action.payload.field] = action.payload.value;
        },
        setType(state, action) {
            state.lessonType = action.payload.value;
            console.log(state.lessonType);
        }
    },
    
});



export const { setValue, setType, toggleLessonForm } = slice.actions;

export default slice.reducer;