import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { close } from "./popupSlice";

export const fetchLogup = createAsyncThunk('user/logup', async ({mail, 
    password, 
    name, 
    surname, 
    fathername}, {dispatch})=> {
    const response = await fetch("http://127.0.0.1:3001/users/logup/", {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: "POST",
        body: JSON.stringify({
            mail, 
            password, 
            name, 
            surname, 
            fathername
        })
    });
    console.log(response.ok)
    dispatch(close());
});

const initialState = {
   
        mail: null,
        password: null,
        repeatPassword: null,
        name: null,
        surname: null,
        fathername: null
    
};

const slice = createSlice({
    name: "logup",
    initialState, 
    reducers: {
        setValue(state, action) {
            state[action.payload.field] = action.payload.value;
        }
    }
});

export const { setValue } = slice.actions;

export default slice.reducer;