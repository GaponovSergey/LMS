import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateGroup from "./CreateGroup";
import Group from "./Group";


export default function GroupsList({course}) {

    const dispatch = useDispatch();
    const groups = useSelector( state => state.groups.groups );

    const list = groups.map( group => <Group group={group} groupsCount={groups.length} key={`group${group.id}`}/>)

    return(
        <div>
            <div>Группы курса:</div>
            <div>{list}</div>
            <CreateGroup course={course} />
        </div>
    )
}