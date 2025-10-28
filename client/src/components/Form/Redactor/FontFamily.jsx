import React, {useEffect, useState} from "react";
import {Select, SelectString, ToggleButton, Options, Option} from "./Select";
import TextDecorator from "./TextDecorator";
import "./redactor.css";


export default function FontFamily({isFromRedactor = false, state = null, concept}) {
    console.log(state)
    const { values, keyStyle} = concept; 

    const valuesMap = (font, i) => {
            
            return(
                <Option value={font} isDefault={state.defaultValue === font} key={"fontfamily" + i}>
                    <span style={{fontFamily: font}}>{font}</span>
                </Option>
            )
        };

    const [options, setOptions] = useState( () => values.map(valuesMap ))

    useEffect( ()=> {
        console.log(options)
        setOptions((options) => options = values.map(valuesMap ))
    }, [state.defaultValue])

    

    return(
        <Select style={{display: "inline-flex", gap: "0.2px"}}>
            <SelectString disabled = { !isFromRedactor ? "disabled" : false } outerValue={state.value} className="FontFamily" onChange={(font)=> {
                if (!isFromRedactor) return;
                
                let decorator = new TextDecorator({
                                        tagName: "fontFamily",
                                        style: {
                                            [keyStyle]: font
                                        }
                            });
                    if (state.isSelected) {
                        
                        decorator.clearDecorator();
                        if (font === state.defaultValue) return;
                        decorator = new TextDecorator({
                                            tagName: "fontFamily",
                                            style: {
                                                [keyStyle]: font
                                            }
                            });
                    }
                    if (font === state.defaultValue) return;
                    decorator.setDecorator();
                }}>
                <span>---</span>  
            </SelectString>
            <ToggleButton disabled = { !isFromRedactor ? "disabled" : false } className="SelectButton SelectButtonRight"/>
            <div style={{position: "absolute", marginTop: "31px"}}>
                <Options style={
                        {
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                            border: "1px black solid"
                        }
                    }>
                    {options}
                </Options>
            </div>
        </Select>
    )
}