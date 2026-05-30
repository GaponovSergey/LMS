import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";
import path from "./config";


export const fetchAnswers = createAsyncThunk("answers/fetchAnswers",
    
    async (data, { dispatch })=> {
        try {
            const response = await fetch(`${path}/answers/getAnswers?courseId=${data.courseId}`, {
                credentials: 'include', 
                method: "GET"
            });
            
            const result = await response.json();

            dispatch(setAnswers(result));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const changeGrade = createAsyncThunk("answers/changeGrade",
    
    async (data, { dispatch })=> {
        try {
            const response = await fetch(`${path}/answers/changeGrade`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
            });
            
            
            dispatch(setGrade(data));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

const slice = createSlice({
    name: "answers",
    initialState: {
        answers: []
    }, 
    reducers: {
        setAnswers(state, {payload}) {
            state.answers = payload
        },
        setGrade(state, {payload}) {
            const index = state.answers.findIndex( answer => answer.id === payload.id);
            state.answers[index].grade = payload.grade;
        }
    }
    
});



export const { setAnswers, setGrade } = slice.actions;

export default slice.reducer;