import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    title: null,
    content: null, 
    isOpened: false
};

const slice = createSlice({
    name: "alert",
    initialState, 
    reducers: {
        setAlert(state, action) {
            state.title = action.payload.title || null;
            state.content = action.payload.content;
            state.isOpened = true;
        },
        close(state) {
            state.isOpened = false;
        }
    }
});

export const { setAlert, close } = slice.actions;

export default slice.reducer;