import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpened: false,
    form: null
};

const slice = createSlice({
    name: "popup",
    initialState, 
    reducers: {
        openLogin(state) {
            state.isOpened = true;
            state.form = "login";
        },
        openLogup(state) {
            state.isOpened = true;
            state.form = "logup";
        },
        close(state) {
            state.isOpened = false;
            state.form = null;
        }
    }
});

export const { openLogin, openLogup, close } = slice.actions;

export default slice.reducer;