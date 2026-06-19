import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";
import { fetchGroups } from "./groupsSlice";
import path from "./config.js";


export const applyForCourse = createAsyncThunk("apply/applyForCourse",
    
    async ({ courseId }, { dispatch })=> {
        try {
            const response = await fetch(`${path}/courses/${courseId}/setApplicant`, {
                credentials: 'include', 
                method: "GET"
            });
            console.log("response")
            console.log(response)
            const {appliedStatus }= await response.json();
            
            dispatch(setAppliedStatus(appliedStatus ));
            
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const withdrawCourseApplication = createAsyncThunk("apply/withdrawCourseApplication",
    
    async ({ courseId }, { dispatch })=> {
        try {
            await fetch(`${path}/courses/${courseId}/deleteApplicant`, {
                credentials: 'include', 
                method: "GET"
            });
            
            dispatch(setAppliedStatus(null));
            
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const fetchApplicationStatus = createAsyncThunk("apply/fetchApplicationStatus",
    
    async ({ courseId }, { dispatch })=> {
        try {
            const response = await fetch(`${path}/courses/${courseId}/getApplicant`, {
                credentials: 'include', 
                method: "GET"
            });

            const { appliedStatus } = await response.json();
            
            dispatch(setAppliedStatus(appliedStatus));
            
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const fetchApplicants = createAsyncThunk("apply/fetchApplicants",
    
    async ({ courseId }, { dispatch })=> {
        try {
            const response = await fetch(`${path}/courses/${courseId}/getApplicants`, {
                credentials: 'include', 
                method: "GET"
            });

            const users  = await response.json();

            console.log("users"); console.log(users)
            
            dispatch(setApplicants(users));
            
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const acceptApplicant = createAsyncThunk("apply/acceptApplicant",
    
    async ({ courseId, authorId, groupId, userId }, { dispatch })=> {
        try {

            console.log("authorId"); console.log(authorId);

            await fetch(`${path}/courses/${courseId}/acceptApplicant`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify({userId, groupId, authorId})
            });
            
            dispatch(deleteApplicant(userId));
            dispatch(fetchGroups({courseId}));
            
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const declineApplicant = createAsyncThunk("apply/declineApplicant",
    
    async ({ courseId, authorId, userId }, { dispatch })=> {
        try {

            await fetch(`${path}/courses/${courseId}/declineApplicant`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "DELETE",
                body: JSON.stringify({userId, authorId})
            });

            dispatch(deleteApplicant(userId));
            
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

const slice = createSlice({
    name: "apply",
    initialState: {
        appliedStatus: null,
        applicants: []
    }, 
    reducers: {
        setAppliedStatus( state, { payload } ) {
            state.appliedStatus = payload;
        },
        setApplicants( state, { payload } ) {
            state.applicants = payload;
        },
        deleteApplicant( state, { payload } ) {
            state.applicants = state.applicants.filter( applicant => applicant.id !== payload);
        }
    }
    
});



export const {setAppliedStatus, setApplicants, deleteApplicant} = slice.actions;

export default slice.reducer;