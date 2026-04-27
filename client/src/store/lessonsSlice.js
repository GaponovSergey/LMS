import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";


export const changeLessonTitle = createAsyncThunk("lessons/changeLessonTitle",
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

export const changeTaskTitle = createAsyncThunk("lessons/changeTaskTitle",
    async (data, {dispatch}) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/tasks/changeTaskTitle`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
                
            });

            dispatch(updateTaskTitle(data));

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
);

export const deleteContent = createAsyncThunk("lessons/deleteContent",
    async (data, {dispatch}) => {
        try {

            const {courseId, contentId} = data;
            const response = await fetch(`http://127.0.0.1:3001/courses/deleteContent`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify({courseId, contentId})
                
            });

            return;

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
);

export const changeContent = createAsyncThunk("lessons/changeContent",
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

export const sendAnswer = createAsyncThunk("lessons/sendAnswer",
    async (data, {dispatch}) => {
        try {

            
            const response = await fetch(`http://127.0.0.1:3001/answers/setAnswer`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "POST",
                body: JSON.stringify(data)
                
            });

            const result = await response.json();

            dispatch(setAnswer({lessonId: data.lessonId, answer: result}));

            return;

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
);

export const changeAnswer = createAsyncThunk("lessons/changeAnswer",
    async (data, {dispatch}) => {
        try {

            
            const response = await fetch(`http://127.0.0.1:3001/answers/changeAnswer`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include', 
                method: "PUT",
                body: JSON.stringify(data)
                
            });

            return;

        } catch(err) {
            let content = err.message;
            dispatch(setAlert({title: "Ошибка", content}));
        }
    }
);



const slice = createSlice({
    name: "lessons",
    initialState: {
        lessons: []
    }, 
    reducers: {
        setLessons(state, {payload}) {

            console.log("setLessons")
            console.log(payload.lessons)
            state.lessons = [...payload.lessons];           

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
        updateTaskTitle(state, {payload}) {
            const lessonIndex = state.lessons.findIndex( lesson => lesson.id === payload.lessonId);
            const taskIndex = state.lessons[lessonIndex].tasks.findIndex( task => task.id === payload.id);
            state.lessons[lessonIndex].tasks[taskIndex].title = payload.title;
        }, 
        dropTask(state, {payload}) {
            const index = state.lessons.findIndex( lesson => lesson.id === payload.lessonId);
            state.lessons[index].tasks = state.lessons[index].tasks.filter( task => task.id !== payload.taskId)
        }, 
        dropLesson(state, {payload}) {
            state.lessons = state.lessons.filter( lesson => lesson.id !== payload.lessonId)
        },
        setAnswer(state, {payload}) {
            
            const lessonIndex = state.lessons.findIndex( lesson => lesson.id === payload.lessonId);
            state.lessons[lessonIndex].tasks.forEach( task => {
                if (task.id !== payload.answer.taskId) return;
                task.answers[0] = {...payload.answer};
            })
        }
    }
    
});



export const { setLessons, pushLesson, pushTask, changeLesson, updateTaskTitle, updateContent, dropTask, dropLesson, setAnswer } = slice.actions;

export default slice.reducer;