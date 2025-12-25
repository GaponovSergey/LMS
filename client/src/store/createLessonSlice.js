import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toggleCourseLoading } from "./courseSlice";
import { uploadFiles } from "./uploadSlice";
import { setAlert } from "./alertSlice";

export const fetchLessonForm = createAsyncThunk("createLesson/fetchLessonForm",
    
    async (data, { dispatch, getState })=> {
        try {

            const {upload} = getState();

            console.log("fetchlesson")
            console.log(upload)

            data.files = upload.lecture.toCreate.map(({id}) => {return {fileId: id};});

            const response = await fetch(`http://127.0.0.1:3001/lessons/`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify(data)
            });

            const payload = await response.json();

            console.log("fetchlesson")
            console.log(payload)

            dispatch(setValue({field: "id", value: payload.id}));
            dispatch(setValue({field: "lecture", value: payload.content}))

            return payload;
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}))
        }
    }
);

export const fetchTaskForm = createAsyncThunk("createLesson/fetchTaskForm",
    
    async (data, { dispatch, getState})=> {

        try {

            const {upload} = getState();

            data.files = upload.task.toCreate.map(({id}) => {return {fileId: id};})

            const response = await fetch(`http://127.0.0.1:3001/tasks/`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify(data)
            });

            const payload = await response.json();

            console.log("fetchtask")
            console.log(payload)

            dispatch(setTask(payload));

            return payload;
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}))
        }
    }
);



export const fetchForm = createAsyncThunk("createLesson/fetchForm",
    
    async ({ to, title, content, html, authorId, courseId, lessonId, taskId = null}, { dispatch, getState })=> {
        try {

            if(!lessonId) {
                const { payload } = await dispatch(fetchLessonForm({authorId, courseId}));
                lessonId = payload.lessonId;
            }

            const { payload } = await dispatch(uploadFiles(to));
            const files = payload.map( file => {return {fileId: file.id};});

            const { createLesson } = getState();
            const state = to === "task" && taskId ? createLesson.tasks[taskId] :  to === "task" ? null : createLesson.lecture;


            const data = {title, content, html, authorId, lessonId, files};

            if (to === "task" && taskId) data.taskId = taskId;

            const response = await fetch(`http://127.0.0.1:3001/${to}s/`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify(data)
            });

            if ( response.ok ) {
                const lesson = await response.json();

                for(let field in lesson) {
                    dispatch(setValue({field, value: lesson[field]}))
                }
            }
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}))
        }
    }
);

const slice = createSlice({
    name: "createLesson",
    initialState: {
        id: null,
        lecture: null,
        tasks: []
    }, 
    reducers: {
        setValue(state, action) {
            state[action.payload.field] = action.payload.value;
        },
        setTask(state, action) {
            return state.tasks.push(action.payload);
        }
    },
    
});



export const { setValue, setTask } = slice.actions;

export default slice.reducer;