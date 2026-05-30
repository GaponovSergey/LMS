import React, { useEffect, useState }  from "react";
import {useSelector, useDispatch} from "react-redux";
import "./dualListBox.css";


export default function DualListBox({subject = {}, accessState}) {

    const groups = useSelector( state => state.groups.groups);
    const [accessGroups, setAccessGroups] = accessState;
    console.log("DualListBox")
    console.log(groups)

    const setDefaultValues = ( group ) => {
        return {
            groupId: group.id,
            groupName: group.groupName,
            access: true
        };
    };
    const setDefinedValues = ( group ) => {
        return {
            groupId: group.id,
            groupName: group.groupName,
            access: group.access[subject.type][subject.id]
        }
    };

    useEffect( () => {
        setAccessGroups( groups.map( subject.type ? setDefinedValues : setDefaultValues) )
    }, [groups]);

    const optionsValue1 = [];
    const optionsValue2 = [];

    
    accessGroups.forEach( (group, i) => group.access ? 
        optionsValue1.push(
            <Option key={"duallistbox" + group.groupId}>
                <p className={"duallistbox-list-item-title"}>{group.groupName}</p>
                <button className={"duallistbox-list-item-button"} onClick={()=> {
                    setAccessGroups( groups => {
                        const newState = [...groups];
                        newState[i].access = !newState[i].access;
                        return newState;
                    })
                }}>{">>"}</button>
            </Option>
        ) : 
        optionsValue2.push(
            <Option key={"duallistbox" + group.groupId}>
                <button className={"duallistbox-list-item-button"} onClick={()=> {
                    setAccessGroups( groups => {
                        const newState = [...groups];
                        newState[i].access = !newState[i].access;
                        return newState;
                    })
                }}>{"<<"}</button>
                <p className={"duallistbox-list-item-title"}>{group.groupName}</p>
            </Option>
        )
    );

    return(
        <>
        <div className={"duallistbox-title"}>Определите доступ к заданию для групп:</div>
        <div className={"duallistbox-container"}>
            <div className={"duallistbox-list-wrap"}>
                <div className={"duallistbox-list-title duallistbox-list-title-accept"}>Разрешить доступ:</div>
                <div className={"duallistbox-list"}>
                    {optionsValue1}
                </div>
            </div>
            <div className={"duallistbox-list-wrap"}>
                <div className={"duallistbox-list-title duallistbox-list-title-decline"}>Запретить доступ:</div>
                <div className={"duallistbox-list"}>
                    {optionsValue2}
                </div>
            </div>
        </div>
        </>
    )
}

function Option({children}) {
    return(
        <div className={"duallistbox-list-item"}>
            {children}
        </div>
    )
}