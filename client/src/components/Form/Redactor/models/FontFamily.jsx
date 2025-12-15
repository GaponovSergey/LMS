import React, {useEffect, useState}  from "react";
import {Select, SelectString, ToggleButton, Options, Option} from "./Select";
import TextDecorator from "../controllers/TextDecorator";
import "./font.css";


export default function FontFamily({isFromRedactor = false, state = null, concept}) {
    console.log(state)
    const {values, keyStyle} = concept; 

    const valuesMap = (font, i) => {
        
            return(
                <Option value={font} className={"font-option"} isDefault={state.defaultValue === font} key={"fontsfamily" + i}>
                    <span style={{fontFamily: font}}>{font}</span>
                </Option>
            )
        };
    
    const [options, setOptions] = useState( () => values.map(valuesMap ))
        
    useEffect( ()=> {
                
        setOptions((options) => options = values.map(valuesMap ))

    }, [state.defaultValue])

    return(
        <Select className={"font-container"}>
            <SelectString disabled = { !isFromRedactor ? "disabled" : false } outerValue={state.value} className={"font-string family-string"} onChange={(font)=> {
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
            <ToggleButton disabled = { !isFromRedactor ? "disabled" : false } className={"font-toggle"} />
            <div className={"font-options-wrap"}>
                <Options className={'font-options family-options'}>
                    <div className={"font-options-inner"}>
                        {options}
                    </div>
                </Options>
            </div>
        </Select>
    )
}