import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        mail: null,
        password: null    
};

const slice = createSlice({
    name: "login",
    initialState, 
    reducers: {
        setValue(state, action) {
            state[action.payload.field] = action.payload.value;
        }
    }
});

export const { setValue } = slice.actions;

export default slice.reducer;