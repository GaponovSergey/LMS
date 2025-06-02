import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";

export const fetchCourses = createAsyncThunk("courses/fetchCourses",
    
    async (_, { dispatch })=> {
        try {
            const response = await fetch("http://127.0.0.1:3001/courses");
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