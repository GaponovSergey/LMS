import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { close } from "./popupSlice";

export const fetchUser = createAsyncThunk("user/fetchUser",
    
    async ({mail, password}, { dispatch })=> {
    const response = await fetch("http://127.0.0.1:3001/users/login/", {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: "POST",
        body: JSON.stringify({
            mail, 
            password
        })
    });
    dispatch(login(await response.json()));
    dispatch(close());
})

const slice = createSlice({
    name: "user",
    initialState: {
        level: 0,
        mail: null,
        name: "Гость"
    }, 
    reducers: {
        login(state, action) {
            state.level = action.payload.level;
            state.mail = action.payload.mail;
            state.name = action.payload.name;
        },
        logout(state) {
            state.level = 0;
            state.mail = null;
            state.name = "Гость";
        }
    }
    
});



export const {login, logout} = slice.actions;

export default slice.reducer;