import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const SelectContext = createContext();

export function Select({style = null, children}) {

    const value = {
        toggler: useState(false),
        value: useState(null),
        options: useState([])
    } 



    return(
        <div style={style}>
            <SelectContext.Provider value={value}>
                {children}
            </SelectContext.Provider>
        </div>
    )
}

export function Options({className = null, style = {display: "block"}, children}) {

    const [isOpened] = useContext(SelectContext).toggler;

    return(
        
        <div className={className} style={isOpened ? style : {display: "none"}}>
            {children}
        </div>
       
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

export function Option({value, className = null, isDefault = false, children}) {
    const [isOpened, setOpened] = useContext(SelectContext).toggler;
    const [valueState, setValue] = useContext(SelectContext).value;
    const [options, setOptions] = useContext(SelectContext).options;

   useEffect(()=> {
        setOptions(options => [...options, {value, isDefault, children}] );
        if(isDefault) setValue(value);
    }, [])

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

    const [valueState, setInnerValue] = useContext(SelectContext).value;


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

export function SelectString({
        className = null, 
        outerValue = null, 
        onChange = null, 
        disabled = false, 
        children
    }) {

    const [innerValue] = useContext(SelectContext).value;
    const [isOpened, setOpened] = useContext(SelectContext).toggler;
    const [options] = useContext(SelectContext).options;

    const [content, setContent] = useState(children);

    useEffect( ()=> {

        if(!onChange) return;

        if(!outerValue) return setContent(children);

        if(outerValue == "default" && options.length) {

            const option = options.find( option => option.isDefault === true);
            if (option) setContent(option.children);
        }
        else {
            if (options.length) {
                const option = options.find( option => option.value === outerValue);
                if (option) setContent(option.children);
            }
        }

    }, [outerValue, options]);

    useEffect( ()=> {

        if(!onChange) return;

        onChange(innerValue);
        if (options.length) {
            const option = options.find( option => option.value === innerValue);
            if (option) setContent(option.children);
        }

    }, [innerValue])

    return(
        <button className={className} onClick={()=> setOpened(!isOpened)} disabled={disabled}>
            {content}
        </button>
    )
}





