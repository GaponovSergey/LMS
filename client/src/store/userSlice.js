import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { close } from "./popupSlice";
import { setAlert } from "./alertSlice";
import path from "./config";

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
        try {
            const response = await fetch(`${path}/users/login/`, {
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
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    
})

export const fetchLogup = createAsyncThunk('user/logup', async ({mail, 
    password, 
    name, 
    surname, 
    fathername}, {dispatch})=> {
    try {
        const response = await fetch(`${path}/users/logup/`, {
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

        if( response.status >= 400) throw new Error((await response.json()).message);
        
        dispatch(close());
    } catch(err) {
                let content = err.message;
                dispatch(setAlert({title: "Ошибка", content}));
            }
});


export const fetchLogout = createAsyncThunk("user/fetchLogout",
    async (_, { dispatch })=> {
        try {
            await fetch(`${path}/users/logout`, {
                credentials: "include",
                method: "GET"
            });
            dispatch(logout());
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
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