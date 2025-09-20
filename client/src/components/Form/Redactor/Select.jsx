import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const SelectContext = createContext();

export function Select({defaultValue, style = null, children}) {

    const value = {
        toggler: useState(false),
        value: useState(defaultValue)
    } 

    return(
        <div style={style}>
            <SelectContext.Provider value={value}>
                {children}
            </SelectContext.Provider>
        </div>
    )
}

export function Options({className = null, style = null, children}) {
    const [isOpened, setOpened] = useContext(SelectContext).toggler;

    return(
        <>   
            {isOpened && 
                <div className={className} style={style}>
                    {children}
                </div>
            }
        </>
    )
}

export function ToggleButton({className = null, disabled = false, children}) {
    const [isOpened, setOpened] = useContext(SelectContext).toggler;
    return(
        <button className={className} onClick={()=> setOpened(!isOpened)} disabled={disabled}>
            {children || <>&or;</> }
        </button>
    )
}

export function Option({value, className = null, children}) {
    const [isOpened, setOpened] = useContext(SelectContext).toggler;
    const [valueState, setValue] = useContext(SelectContext).value;

    return(
        <button className={className} onClick={()=> {
            setValue(value);
            setOpened(false);
        }}>
            {children}
        </button>
    )
}

export function SelectButton({
        className = null, 
        setValue = null, 
        onClick = null, 
        disabled = false, 
        children
    }) {

    const [valueState] = useContext(SelectContext).value;

    useEffect( ()=> {
        if(setValue) setValue(valueState);
        if(onClick) onClick(valueState);
    }, [valueState]);

    return(
        <button className={className} onClick={()=> onClick ? onClick(valueState) : null} disabled={disabled}>
            {children}
        </button>
    )
}





