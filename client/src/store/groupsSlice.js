import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";
import { toggleCourseLoading } from "./courseSlice";


export const fetchGroups = createAsyncThunk("groups/fetchGroups",
    
    async ({ courseId }, { dispatch })=> {
        try {
            const response = await fetch(`http://127.0.0.1:3001/groups/${courseId}`, {
                credentials: 'include', 
                method: "GET"
            });

            if( response.status >= 400) throw new Error((await response.json()).message);

            const groups = await response.json();

            console.log("groups")
            console.log(groups)
            
            dispatch(setGroups(groups));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const fetchStudents = createAsyncThunk("groups/fetchStudents",
    
    async ({ courseId }, { dispatch })=> {
        try {
            const response = await fetch(`http://127.0.0.1:3001/groups/${courseId}/students`, {
                credentials: 'include', 
                method: "GET"
            });

            if( response.status >= 400) throw new Error((await response.json()).message);

            const students = await response.json();

            console.log("students")
            console.log(students)
            
            dispatch(setStudents(students));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const addGroup = createAsyncThunk("groups/addGroup",
    
    async (data, { dispatch })=> {
        try {

            console.log("addgroup")
            console.log(data)
            const response = await fetch(`http://127.0.0.1:3001/groups/`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify(data)
            });

            if( response.status >= 400) throw new Error((await response.json()).message);
            
            dispatch(fetchGroups({courseId: data.courseId}));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const deleteGroup = createAsyncThunk("groups/deleteGroup",
    
    async (data, { dispatch })=> {
        try {

            console.log("deletegroup")
            console.log(data)
            const response = await fetch(`http://127.0.0.1:3001/groups/deleteGroup`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify(data)
            });

            if( response.status >= 400) throw new Error((await response.json()).message);
            
            dispatch(dropGroup({groupId: data.groupId}));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const changeGroup = createAsyncThunk("groups/changeGroup",
    
    async (data, { dispatch })=> {
        try {

            const response = await fetch(`http://127.0.0.1:3001/groups/`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
            });

            if( response.status >= 400) throw new Error((await response.json()).message);
            
            dispatch(fetchGroups({courseId: data.courseId}));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const changeGroupName = createAsyncThunk("groups/changeGroupName",
    
    async (data, { dispatch })=> {
        try {

            const response = await fetch(`http://127.0.0.1:3001/groups/changeGroupName`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
            });

            if( response.status >= 400) throw new Error((await response.json()).message);
            
            dispatch(fetchGroups({courseId: data.courseId}));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const changeGroupAccesses = createAsyncThunk("groups/changeGroupAccesses",
    
    async (data, { dispatch })=> {
        try {

            const response = await fetch(`http://127.0.0.1:3001/groups/changeGroupAccesses`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
            });

            if( response.status >= 400) throw new Error((await response.json()).message);

            dispatch(toggleCourseLoading())

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const deleteStudent = createAsyncThunk("groups/deleteStudent",
    
    async (data, { dispatch })=> {
        try {

            const response = await fetch(`http://127.0.0.1:3001/groups/deleteStudent`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify(data)
            });

            if( response.status >= 400) throw new Error((await response.json()).message);
            
            dispatch(dropStudent({studentId: data.studentId}));
            dispatch(fetchGroups({courseId: data.courseId}))

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const completeCourse = createAsyncThunk("groups/completeCourse",
    
    async (data, { dispatch })=> {
        try {

            const response = await fetch(`http://127.0.0.1:3001/groups/completeCourse`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify(data)
            });

            if( response.status >= 400) throw new Error((await response.json()).message);
            
            dispatch(dropStudent({studentId: data.studentId}));
            dispatch(fetchGroups({courseId: data.courseId}));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

const slice = createSlice({
    name: "groups",
    initialState: {
        groups: [],
        students: []
    }, 
    reducers: {
        setGroups( state, { payload } ) {
            state.groups = payload;
        },
        setStudents( state, { payload } ) {
            state.students = payload;
        },
        dropGroup( state, { payload } ) {
            state.groups = state.groups.filter( group => group.id !== payload.groupId);
        },
        dropStudent( state, { payload } ) {
            state.students = state.students.filter( student => student.id !== payload.studentId);

        }
    }
    
});



export const {setGroups, setStudents, dropGroup, dropStudent} = slice.actions;

export default slice.reducer;