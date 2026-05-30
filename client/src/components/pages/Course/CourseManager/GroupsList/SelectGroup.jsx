import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {Select, SelectString, ToggleButton, Options, Option} from "../../../../Form/Redactor/models/Select";
import "./selectGroup.css";


export default function SelectGroup({setGroup, defaultGroup = null, outerValue = "default"}) {

    const {groups } = useSelector( state => state.groups );

    useEffect( ()=> {
        if(groups.length) {
            setGroup(defaultGroup || groups[0].id)
        }
    }, [groups])

    const groupsList = groups.map(group => 
                    <Option value={group.id} className={"selectgroup-option"} 
                        isDefault={group.id === (defaultGroup ? defaultGroup : groups[0].id)} 
                        key={"group" + group.id}>
                        <span >{group.groupName}</span>
                    </Option>);

    return(
        
                <Select className={"selectgroup-container"}>
                    <SelectString onChange={ groupId => setGroup(groupId)}  className={"selectgroup-string"} valueOnly={false} outerValue={outerValue}>
                        <span>---</span>
                    </SelectString>
                    <ToggleButton className={"selectgroup-toggle"} />
                    <div className={"selectgroup-options-wrap"}>
                        <Options className={'selectgroup-options'}>
                            <div className={"selectgroup-options-inner"}>
                                {groupsList}
                            </div>
                            
                        </Options>
                    </div>
                    
                </Select>
            
    )
}