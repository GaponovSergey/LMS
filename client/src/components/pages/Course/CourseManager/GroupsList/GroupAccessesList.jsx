import React, {useEffect} from "react";
import { useSelector } from "react-redux";


export default function GroupAccessesList({accessesState, groupId = null, disabled = false}) {

    const [accesses, setAccesses] = accessesState;
    const lessons = useSelector( state => state.lessons.lessons );   
    

    useEffect( ()=> {

        if (!groupId) {

            const tasksAccesses = lessons.map( lesson => {
                return lesson?.tasks?.map( task => {
                    return {
                        taskId: task.id,
                        groupId,
                        access: true
                    }
                }) || []
            });

            setAccesses([].concat(...tasksAccesses));
        } else {
            setAccesses([]);
        }
        
    }, [lessons])


    const lessonsList = lessons.length ? lessons.map( lesson => {

        const tasksList = lesson.tasks && lesson.tasks.map( task => {

            const accessesResult = accesses.find( state => state.taskId === task.id);
            const taskAccessesResult = task.accesses.find( state => state.groupId === groupId)
            console.log("accesses")
            console.log(accesses )
            console.log(task.accesses )
            console.log(accessesResult )
            console.log(taskAccessesResult )
            const access =  !groupId ? accessesResult?.access ?? true : accessesResult?.access ?? taskAccessesResult?.access;

            return(
                <div className={"groupaccesses-task-container"} key={"taskAccess" + task.id}><button disabled={disabled ? "disabled" : ""} className={`checkbox-cell ${access && "checkbox-cell-on"}`} onClick={ ()=> {
                    
                    if(groupId && (task.accesses.find( state => state.groupId === groupId))?.access === !access) {
                        return setAccesses(accesses.filter(state => state.taskId !== task.id));
                    }

                    setAccesses( state => {
                        let newState = [];
                        if (state.find( taskState => taskState.taskId === task.id)) {
                            newState = state.filter( taskState => taskState.taskId !== task.id)
                        } else {
                            
                            newState = [...state];
                        }
                        newState.push({
                            taskId: task.id,
                            groupId,
                            access: !access
                        })
                        return newState;
                    })
                }}><div className={`checkbox-mark ${access && "checkbox-mark-on"}`}></div></button><p>{task.title}</p>
                </div>
            );
        })

        return(
            <div className={"groupaccesses-lesson-container"} key={"lessonAccess" + lesson.id}>
                <div className={"groupaccesses-lesson-title"}>Задания урока "{lesson.title}":</div>
                <div className={"groupaccesses-lesson-tasks-container"}>
                    {tasksList}
                </div>
            </div>
        );
    }) : null;

    return lessonsList;
}