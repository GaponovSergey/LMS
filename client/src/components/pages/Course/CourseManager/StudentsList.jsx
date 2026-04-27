import React, {useEffect} from "react";
import { fetchStudents } from "../../../../store/groupsSlice";
import { useDispatch, useSelector } from "react-redux";
import Student from "./Student";

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
        <div>
            <h4>Список студентов:</h4>
            <div>
                {studentsList}
            </div>
            
        </div>
    )

}