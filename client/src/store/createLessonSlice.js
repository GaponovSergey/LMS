import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toggleCourseLoading,  } from "./courseSlice";
import { pushLesson, pushTask } from "./lessonsSlice"
import { setAlert } from "./alertSlice";
import { triggerNavLoading } from "./navigatorSlice";

export const fetchLessonForm = createAsyncThunk("createLesson/fetchLessonForm",
    
    async (data, { dispatch })=> {
        try {


            console.log("fetchlesson")
            console.log(data)

            

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

            dispatch(pushLesson(payload));
            dispatch(triggerNavLoading());

            return payload;
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}))
        }
    }
);

export const fetchTaskForm = createAsyncThunk("createLesson/fetchTaskForm",
    
    async (data, { dispatch })=> {

        try {

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

            dispatch(pushTask(payload));
            dispatch(triggerNavLoading()); 

            return payload;
        } catch(err) {
            let content = err.message;
            console.log(err)
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
        setValues(state, {payload}) {
            for (let key in payload) {
                state[key] = payload[key];
            }
        },
        setTask(state, action) {
            state.tasks.push(action.payload);
        }
    },
    
});



export const { setValue, setTask } = slice.actions;

export default slice.reducer;