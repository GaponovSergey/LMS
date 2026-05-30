import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import popupReducer from "./popupSlice.js";
import coursesReducer from "./coursesSlice.js";
import courseReducer from "./courseSlice.js";
import fileReducer from "./uploadSlice.js";
import createCourseReducer from "./createCourseSlice.js";
import createLessonReducer from "./createLessonSlice.js";
import alertReducer from "./alertSlice.js";
import navigatorReducer from "./navigatorSlice.js";
import applyReducer from "./applySlice.js";
import groupsReducer from "./groupsSlice.js";
import lessonsReducer from "./lessonsSlice.js";
import answersReducer from "./answersSlice.js";

export default configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true,
      }),
    reducer: {
        user: userReducer,
        popup: popupReducer,
        alert: alertReducer,
        courses: coursesReducer,
        course: courseReducer,
        createCourse: createCourseReducer,
        createLesson: createLessonReducer,
        upload: fileReducer,
        navigator: navigatorReducer,
        apply: applyReducer,
        groups: groupsReducer,
        lessons: lessonsReducer,
        answers: answersReducer
    }
})