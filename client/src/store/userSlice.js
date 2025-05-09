import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { close } from "./popupSlice";

const initialState = {
    level: 0,
    mail: null,
    id: null,
    name: "Гость"
};

export const fetchUser = createAsyncThunk("user/fetchUser",
    
    async ({mail, password}, { dispatch })=> {
    const response = await fetch("http://127.0.0.1:3001/users/login/", {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
            mail, 
            password
        })
    });
    console.log(await response.headers.get('Set-Cookie'));
    dispatch(login(await response.json()));
    
    dispatch(close());
})

const getState = () => {
    return {...JSON.parse(localStorage.getItem('user'))} || {...initialState};
}

const slice = createSlice({
    name: "user",
    initialState: getState(), 
    reducers: {
        login(state, action) {
            state.level = action.payload.level;
            state.mail = action.payload.mail;
            state.name = action.payload.name;
            state.id = action.payload.id;
            localStorage.setItem('user', JSON.stringify(state));
        },
        logout(state) {
            state.level = 0;
            state.mail = null;
            state.name = "Гость";
            localStorage.setItem('user', JSON.stringify(state));
        }
    }
    
});



export const {login, logout} = slice.actions;

export default slice.reducer;