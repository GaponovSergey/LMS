import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { close } from "./popupSlice";

const initialState = {
    account: {
        level: 0,
        mail: null,
        id: null
    },
    profile: {}
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
    dispatch(login(await response.json()));
    
    dispatch(close());
})

export const fetchLogout = createAsyncThunk("user/fetchLogout",
    async (_, { dispatch })=> {
        await fetch("http://127.0.0.1:3001/users/logout", {
            credentials: "include",
            method: "GET"
        });
        dispatch(logout());
})

const getState = () => {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(localStorage.getItem('user'));
    return initialState;
}

const slice = createSlice({
    name: "user",
    initialState: getState(), 
    reducers: {
        login(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        },
        logout(state) {
            localStorage.removeItem('user');
            return initialState;
        }
    }
    
});



export const {login, logout} = slice.actions;

export default slice.reducer;