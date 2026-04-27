import React, { useEffect, useState }  from "react";
import {useSelector, useDispatch} from "react-redux";


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
                {group.groupName}
                <button onClick={()=> {
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
                <button onClick={()=> {
                    setAccessGroups( groups => {
                        const newState = [...groups];
                        newState[i].access = !newState[i].access;
                        return newState;
                    })
                }}>{"<<"}</button>
                {group.groupName}
            </Option>
        )
    );

    return(
        <div className={"duallistbox"}>
            <div>
                {optionsValue1}
            </div>
            <div>
                {optionsValue2}
            </div>
        </div>
    )
}

function Option({children}) {
    return(
        <>
            {children}
        </>
    )
}