import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { close } from "./popupSlice";

export const fetchCourseForm = createAsyncThunk("createCourse/fetchCourseForm",
    
    async (data, { dispatch })=> {
        const response = await fetch("http://127.0.0.1:3001/courses/", {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include', 
            method: "POST",
            body: JSON.stringify(data)
        });
    if ( response.ok ) dispatch(close());
})

const slice = createSlice({
    name: "createCourse",
    initialState: {
        title: null,
        description: null
    }, 
    reducers: {
        setValue(state, action) {
            state[action.payload.field] = action.payload.value;
        }
    }
    
});



export const { setValue } = slice.actions;

export default slice.reducer;