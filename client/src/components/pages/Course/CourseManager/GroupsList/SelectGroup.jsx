import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {Select, SelectString, ToggleButton, Options, Option} from "../../../../Form/Redactor/models/Select";


export default function SelectGroup({setGroup, defaultGroup = null, outerValue = "default"}) {

    const {groups } = useSelector( state => state.groups );

    useEffect( ()=> {
        if(groups.length) {
            setGroup(defaultGroup || groups[0].id)
        }
    }, [groups])

    const groupsList = groups.map(group => 
                    <Option value={group.id} className={"font-option"} 
                        isDefault={group.id === (defaultGroup ? defaultGroup : groups[0].id)} 
                        key={"group" + group.id}>
                        <span >{group.groupName}</span>
                    </Option>);

    return(
        
                <Select>
                    <SelectString onChange={ groupId => setGroup(groupId)} valueOnly={false} outerValue={outerValue}>
                        <span>---</span>
                    </SelectString>
                    <ToggleButton />
                    <Options>
                        {groupsList}
                    </Options>
                </Select>
            
    )
}