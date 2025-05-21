import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toggleCourseLoading } from "./courseSlice";

export const fetchLessonForm = createAsyncThunk("createLesson/fetchLessonForm",
    
    async ({lessonType, data}, { dispatch })=> {
        const response = await fetch(`http://127.0.0.1:3001/${lessonType}s/`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include', 
            method: "POST",
            body: JSON.stringify(data)
        });
    if ( response.ok ) {
        dispatch( toggleLessonForm() );
        dispatch( toggleCourseLoading() );
    }
})

const slice = createSlice({
    name: "createLesson",
    initialState: {
        title: null,
        content: null,
        lessonType: "lecture",
        isOpened: false
    }, 
    reducers: {
        setValue(state, action) {
            state[action.payload.field] = action.payload.value;
        },
        setType(state, action) {
            state.lessonType = action.payload.value;
            console.log(state.lessonType);
        },
        toggleLessonForm(state) {
            state.isOpened = !state.isOpened;
        }
    }
    
});



export const { setValue, setType, toggleLessonForm } = slice.actions;

export default slice.reducer;