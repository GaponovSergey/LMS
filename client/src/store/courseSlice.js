import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourse = createAsyncThunk("course/fetchCourse",
    
    async ({ courseId }, { dispatch })=> {
    const response = await fetch("http://127.0.0.1:3001/courses/" + courseId);
    dispatch(setCourse(await response.json()));
    dispatch(toggleCourseLoading() )
})

const slice = createSlice({
    name: "course",
    initialState: {
        id: null,
        title: "",
        description: "",
        authorId: null,
        lectures: [],
        isCourseLoaded: false
    }, 
    reducers: {
        setCourse(state, action) {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.authorId = action.payload.authorId;
            state.id = action.payload.id;
            state.lectures =[...action.payload.Lectures];

        },
        toggleCourseLoading( state ) {
            state.isCourseLoaded = !state.isCourseLoaded;
        }
    }
    
});



export const { setCourse, toggleCourseLoading } = slice.actions;

export default slice.reducer;