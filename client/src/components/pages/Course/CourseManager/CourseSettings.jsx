import React from "react";
import {Select, SelectString, ToggleButton, Options, Option} from "../../../Form/Redactor/models/Select";
import { useDispatch } from "react-redux";
import { changeAccess } from "../../../../store/courseSlice";
import DeleteCourse from "./DeleteCourse";
import "./courseSettings.css";


export default function CourseSettings({course}) {

    const accessOptions = [
        {   
            value: "opened",
            title: "всем"
        }, {   
            value: "groups only",
            title: "только группам"
        }, {   
            value: "closed",
            title: "никому"
        }
    ];

    const dispatch = useDispatch();

    console.log(course.access)

    const accessList = accessOptions.map( ({title, value})=>
        <Option value={value} className={"coursesettings-option"} isDefault={value == course.access} key={"accessOption" + value}>
            <span >{title}</span>
        </Option>)    
     

    return(
        <div className={"coursemanager-item-container"}>
        <div>
            <div>Разрешить доступ к курсу:&nbsp; 
            <Select className={"selectgroup-container"}>
                <SelectString  className={"coursesettings-string"} onChange={  value => {
                    if (course.id && value !== course.access) dispatch(changeAccess({courseId: course.courseId, access: value}));
                }} valueOnly={false} >
                    <span>---</span>
                </SelectString>
                <ToggleButton className={"selectgroup-toggle"} />
                <div className={"selectgroup-options-wrap"}>
                    <Options className={'coursesettings-options'}>
                        <div className={"coursesettings-options-inner"}>
                            {accessList}
                        </div>                       
                    </Options>
                </div>
            </Select>
            </div>
        </div>
        <div>
            <DeleteCourse data={{courseId: course.courseId}} />
        </div>
        </div>
    )
}