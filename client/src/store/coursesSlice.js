import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";
import path from "./config.js";

export const fetchCourses = createAsyncThunk("courses/fetchCourses",
    
    async (_, { dispatch })=> {
        try {
            const response = await fetch(`${path}/courses`, { method: "GET"});
            dispatch(addCourses(await response.json()));
            dispatch(toggleCoursesLoading( ) );
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

const slice = createSlice({
    name: "courses",
    initialState: {
        courses: [],
        isCoursesLoaded: false
    }, 
    reducers: {
        addCourses(state, action) {
            state.courses = [...action.payload];
        },
        toggleCoursesLoading( state ) {
            state.isCoursesLoaded = !state.isCoursesLoaded;
        }
    }
    
});



export const { addCourses, toggleCoursesLoading } = slice.actions;

export default slice.reducer;