import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import logupReducer from "./logupSlice.js";
import loginReducer from "./loginSlice.js";
import popupReducer from "./popupSlice.js";
import coursesReducer from "./coursesSlice.js";
import courseReducer from "./courseSlice.js";
import fileReducer from "./uploadSlice.js";
import createCourseReducer from "./createCourseSlice.js";
import createLessonReducer from "./createLessonSlice.js";
import alertReducer from "./alertSlice.js";
import navigatorReducer from "./navigatorSlice.js";

export default configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true,
      }),
    reducer: {
        user: userReducer,
        logup: logupReducer,
        login: loginReducer,
        popup: popupReducer,
        alert: alertReducer,
        courses: coursesReducer,
        course: courseReducer,
        createCourse: createCourseReducer,
        createLesson: createLessonReducer,
        upload: fileReducer,
        navigator: navigatorReducer
    }
})