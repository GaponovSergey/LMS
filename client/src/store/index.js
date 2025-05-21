import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import logupReducer from "./logupSlice.js";
import loginReducer from "./loginSlice.js";
import popupReducer from "./popupSlice.js";
import coursesReducer from "./coursesSlice.js";
import courseReducer from "./courseSlice.js";
import createCourseReducer from "./createCourseSlice.js";
import createLessonReducer from "./createLessonSlice.js";

export default configureStore({
    reducer: {
        user: userReducer,
        logup: logupReducer,
        login: loginReducer,
        popup: popupReducer,
        courses: coursesReducer,
        course: courseReducer,
        createCourse: createCourseReducer,
        createLesson: createLessonReducer
    }
})