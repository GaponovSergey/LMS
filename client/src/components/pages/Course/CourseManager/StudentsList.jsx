import React, {useEffect} from "react";
import { fetchStudents, sortStudents } from "../../../../store/groupsSlice";
import { useDispatch, useSelector } from "react-redux";
import Student from "./Student";
import "./studentsList.css";

export default function StudentsList({course}) {

    const dispatch = useDispatch();
    


    useEffect( ()=> {
        dispatch(fetchStudents(course));
    }, []);
    
    const students = useSelector( state => state.groups.students); 
    console.log("students")
    console.log(students)

    const studentsList = students.map(data => <Student data={data} key={`studentList${data.id}`} />)

    return(
        <div className={"coursemanager-item-container"}>
            <p>Список студентов:</p>
            <div className={"studentslist-list"}>
                <div className={"studentslist-list-title"}>
                    <div className={"studentslist-list-title-cell"} onClick={ () => dispatch(sortStudents("surname"))}>
                        ФИО:
                    </div>
                    <div className={"studentslist-list-title-cell"} onClick={ () => dispatch(sortStudents("groupName"))}>
                        Группа:
                    </div>
                    <div className={"studentslist-list-title-cell"} onClick={ () => dispatch(sortStudents("answersCount"))}>
                        Сдано работ:
                    </div>
                    <div className={"studentslist-list-title-cell"}>
                    </div>
                </div> 
                {studentsList}
            </div>
            
        </div>
    )

}