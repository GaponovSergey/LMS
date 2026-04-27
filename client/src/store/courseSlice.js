import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";
import { setLessons } from "./lessonsSlice";


export const fetchCourse = createAsyncThunk("course/fetchCourse",
    
    async ({ courseId }, { dispatch })=> {
        try {
            const response = await fetch("http://127.0.0.1:3001/courses/" + courseId, {
                credentials: 'include', 
                method: "GET"
            });
            const data = await response.json();
            console.log("data")
            console.log(data)
            dispatch(setCourse(data));
            dispatch(setLessons(data))
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const deleteCourse = createAsyncThunk("createCourse/deleteCourse",
    
    async (data, { dispatch })=> {
        try {
            const response = await fetch("http://127.0.0.1:3001/courses/deleteCourse", {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify(data)
            });
            console.log(data)
            if ( response.ok ) {
                console.log( await response.json())
                window.location.href = "/";
                dispatch(setAlert({title: "", content: "Курс удален"}));
            }
        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
})

export const changeAccess = createAsyncThunk("course/changeAccess",
    async (data, {dispatch}) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/courses/changeAccess`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
                
            });

            dispatch(setAccess(data.access));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
)

export const changeCourseTitle = createAsyncThunk("course/changeCourseTitle",
    async (data, {dispatch}) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/courses/changeCourseTitle`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
                
            });

            dispatch(setTitle(data.title));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
);

export const changeCourseDescription = createAsyncThunk("course/changeCourseDescription",
    async (data, {dispatch}) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/courses/changeCourseDescription`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
                
            });

            dispatch(setDescription(data.description));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
);

export const changeLessonTitle = createAsyncThunk("course/changeLessonTitle",
    async (data, {dispatch}) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/lessons/changeLessonTitle`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
                
            });

            dispatch(changeLesson({
                id: data.lessonId,
                title: data.title
            }));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
);

export const changeContent = createAsyncThunk("course/changeContent",
    async (data, {dispatch}) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/courses/changeContent`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
                
            });
            const result = await response.json();
            return result;

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
);



const slice = createSlice({
    name: "course",
    initialState: {
        id: null,
        title: "",
        description: "",
        access: "opened",
        authorId: null,
        loadingTrigger: false, 
        group: {
            groupId: null,
            groupName: null
        }
    }, 
    reducers: {
        setCourse(state, {payload}) {
            state.title = payload.title;
            state.description = payload.description;
            state.access = payload.access;

            if (payload.group?.groupId) state.group = payload.group;

            state.authorId = payload.authorId;
            state.id = payload.id;         

        },
        setAccess(state, {payload}) {
            state.access = payload.access;
        },
        setTitle(state, {payload}) {
            state.title = payload.title;
        },
        setDescription(state, {payload}) {
            state.title = payload.description;
        },
        pushLesson(state, action) {
            state.lessons.push(action.payload);
        },
        pushTask(state, action) {
            const lesson = state.lessons.find(lesson => lesson.id === action.payload.lessonId);

            if (lesson) {
                if (!lesson.tasks) lesson.tasks = [action.payload];
                else lesson.tasks.push(action.payload);
            }
        },
        updateContent(state, {payload}) {
            const {lessonId, taskId,  deletedFiles = [], createdFiles = [] } = payload;
            const lessonIndex = state.lessons.findIndex( lesson => lesson.id === lessonId);

            const changing = (content) => {
                content.files = content.files.filter( file => !deletedFiles.includes(file.id));
                content.files.push(...createdFiles);
                content.html = payload.content.html; 
            }

            if (taskId) {
                const taskIndex = state.lessons[lessonIndex].tasks.findIndex( task => task.id === taskId);
                const content = state.lessons[lessonIndex].tasks[taskIndex].content;
                changing(content);
            } else {
                const content = state.lessons[lessonIndex].content;
                changing(content);
            }
           
        },
        changeLesson(state, {payload}) {
            const index = state.lessons.findIndex( lesson => lesson.id === payload.id);
            state.lessons[index] = {
                ...state.lessons[index], ...payload
            }
        },
        toggleCourseLoading( state ) {
            state.loadingTrigger = !state.loadingTrigger
        }
    }
    
});



export const { setCourse, toggleCourseLoading, pushLesson, pushTask, setAccess, setTitle, setDescription, changeLesson, updateContent } = slice.actions;

export default slice.reducer;