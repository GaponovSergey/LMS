import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpened: false,
    form: null
};

const slice = createSlice({
    name: "popup",
    initialState, 
    reducers: {
        open(state, action) {
            state.isOpened = true;
            state.form = action.payload.form;
        },
        close(state) {
            state.isOpened = false;
            state.form = null;
        }
    }
});

export const { open, close } = slice.actions;

export default slice.reducer;