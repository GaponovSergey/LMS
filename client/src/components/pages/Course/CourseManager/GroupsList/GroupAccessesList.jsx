import React, {useEffect} from "react";
import { useSelector } from "react-redux";


export default function GroupAccessesList({accessesState, groupId = null, disabled = false}) {

    const [accesses, setAccesses] = accessesState;
    const lessons = useSelector( state => state.lessons.lessons );   
    

    useEffect( ()=> {

        if (!groupId) {

            const tasksAccesses = lessons.map( lesson => {
                return lesson.tasks.map( task => {
                    return {
                        taskId: task.id,
                        groupId,
                        access: true
                    }
                })
            });

            setAccesses([].concat(...tasksAccesses));
        } else {
            setAccesses([]);
        }
        
    }, [lessons])


    const lessonsList = lessons.length ? lessons.map( lesson => {

        const tasksList = lesson.tasks.map( task => {

            const accessesResult = accesses.find( state => state.taskId === task.id);
            const taskAccessesResult = task.accesses.find( state => state.groupId === groupId)
            console.log("accesses")
            console.log(accesses )
            console.log(task.accesses )
            console.log(accessesResult )
            console.log(taskAccessesResult )
            const access =  !groupId ? accessesResult?.access ?? true : accessesResult?.access ?? taskAccessesResult?.access;

            return(
                <button disabled={disabled ? "disabled" : ""} key={"taskAccess" + task.id} onClick={ ()=> {
                    
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
                }}>{access ? "galochka " : "net galochki "}{task.title}</button>
            );
        })

        return(
            <div key={"lessonAccess" + lesson.id}>
                <div>{lesson.title}</div>
                <div>
                    {tasksList}
                </div>
            </div>
        );
    }) : null;

    return lessonsList;
}