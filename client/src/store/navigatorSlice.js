import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";
import path from "./config";



export const getCourseContent = createAsyncThunk("navigator/getCourseContent",
    async ({courseId}, {dispatch}) => {
        try {

            const res = await fetch(`${path}/courses/navigator?courseId=${courseId}`);
            const content = await res.json();
            console.log("content")
            console.log(content)

            dispatch(setContent(content));

        } catch(err) {
            console.log(err);
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
)

const slice = createSlice({
    name: "navigator",
    initialState: {
        courseId: null,
        authorId: null,
        lessons: [],
        isLessonsLoaded: false,
        current: ""
    },
    reducers: {
        setContent(state, action) {
            const {id, authorId, lessons} = action.payload;
            state.courseId = id;
            state.authorId = authorId;
            state.lessons = lessons;
        },
        triggerLink(state, action) {
            state.current = action.payload;
        },
        triggerNavLoading(state) {
            state.isLessonsLoaded = !state.isLessonsLoaded
        }
    }
});

export const { setContent, triggerLink, triggerNavLoading } = slice.actions;
export default slice.reducer;