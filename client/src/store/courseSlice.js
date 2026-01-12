import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";

export const fetchCourse = createAsyncThunk("course/fetchCourse",
    
    async ({ courseId }, { dispatch })=> {
        try {
            const response = await fetch("http://127.0.0.1:3001/courses/" + courseId);
            const data = await response.json();
            console.log(data)
            dispatch(setCourse(data));
            dispatch(toggleCourseLoading() );
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

const slice = createSlice({
    name: "course",
    initialState: {
        id: null,
        title: "",
        description: "",
        authorId: null,
        lessons: [],
        isCourseLoaded: false
    }, 
    reducers: {
        setCourse(state, action) {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.authorId = action.payload.authorId;
            state.id = action.payload.id;
            state.lessons = [...action.payload.lessons];

        },
        pushLesson(state, action) {
            state.lessons.push(action.payload);
        },
        pushTask(state, action) {
            const lesson = state.lessons.find(lesson => lesson.id === action.payload.lessonId);

            if (lesson) {
                if (!lesson.tasks) lesson.tasks = [action.payload];
                else lesson.tasks.push(action.payload);
            }
        },
        toggleCourseLoading( state ) {
            state.isCourseLoaded = !state.isCourseLoaded;
        }
    }
    
});



export const { setCourse, toggleCourseLoading, pushLesson, pushTask } = slice.actions;

export default slice.reducer;