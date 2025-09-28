import React from "react";
import {Select, SelectString, ToggleButton, Options, Option} from "./Select";
import TextDecorator from "./TextDecorator";
import "./redactor.css";


export default function FontFamily({isFromRedactor = false, state = null, concept}) {
    console.log(state)
    const {defaultValue, values, keyStyle} = concept; 

    const options = values.map((font, i) => {
        
            return(
                <Option value={font} isDefault={defaultValue === font} key={"fontfamily" + i}>
                    <span style={{fontFamily: font}}>{font}</span>
                </Option>
            )
        })

    return(
        <Select style={{display: "inline-flex", gap: "0.2px"}}>
            <SelectString disabled = { !isFromRedactor ? "disabled" : false } outerValue={state.value} className="FontFamily" onChange={(font)=> {
                if (!isFromRedactor) return;
                let decorator = new TextDecorator("fontFamily", {[keyStyle]: font});
                    if (state.isSelected) {
                        console.log("there")
                        decorator.clearDecorator();
                        decorator = new TextDecorator("fontFamily", {[keyStyle]: font});
                    }
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