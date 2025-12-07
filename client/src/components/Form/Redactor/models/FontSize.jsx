import React, {useEffect, useState}  from "react";
import {Select, SelectString, ToggleButton, Options, Option} from "./Select";
import TextDecorator from "../controllers/TextDecorator";
import "./font.css";


export default function FontSize({isFromRedactor = false, state = null, concept}) {
    console.log(state)
    const {values, keyStyle} = concept; 

    const valuesMap = (size, i) => {
        
            return(
                <Option value={size} className={"font-option"} isDefault={state.defaultValue === size} key={"fontsize" + i}>
                    <span style={{fontSize: size}}>{parseInt(size)}</span>
                </Option>
            )
        };
    
    const [options, setOptions] = useState( () => values.map(valuesMap ))
        
    useEffect( ()=> {
                
        setOptions((options) => options = values.map(valuesMap ))

    }, [state.defaultValue])

    return(
        <Select className={"font-container"}>
            <SelectString disabled = { !isFromRedactor ? "disabled" : false } outerValue={state.value} className={"font-string size-string"} onChange={(size)=> {
                if (!isFromRedactor) return;
                let decorator = new TextDecorator({
                                        tagName: "fontSize",
                                        style: {
                                            [keyStyle]: size
                                        }
                            });
                    if (state.isSelected) {
                        
                        decorator.clearDecorator();
                        if (size === state.defaultValue) return;
                        decorator = new TextDecorator({
                                        tagName: "fontSize",
                                        style: {
                                            [keyStyle]: size
                                        }
                            });
                    }
                    if (size === state.defaultValue) return;
                    decorator.setDecorator();
                }}>
                <span>---</span>  
            </SelectString>
            <ToggleButton disabled = { !isFromRedactor ? "disabled" : false } className={"font-toggle"} />
            <div className={"font-options-wrap"}>
                <Options className={'font-options size-options'}>
                    <div className={"font-options-inner"}>
                        {options}
                    </div>
                </Options>
            </div>
        </Select>
    )
}