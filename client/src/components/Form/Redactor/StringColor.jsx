import React from "react";
import {useState} from "react";
import {Select, SelectButton, ToggleButton, Options, Option} from "./Select";
import TextDecorator from "./TextDecorator";
import "./redactor.css";


export default function StringColor({isFromRedactor = false, state = null, concept}) {

    const {defaultValue, values, keyStyle} = concept; 

    const [valueState, setValueState] = useState(defaultValue);

    const options = values.map((color, i) => {
        
            return(
                <Option value={color} isDefault={defaultValue === color} key={"stringcolor" + i}>
                    <div style={{width: "30px", height: "30px", backgroundColor: color}}></div>
                </Option>
            )
        })

    return(
        <Select style={{display: "inline-flex", gap: "0.2px"}}>
            <SelectButton disabled = { !isFromRedactor ? "disabled" : false } className="SelectButton SelectButtonLeft" onClick={(color)=> {
                if (!isFromRedactor) return;
                let decorator = new TextDecorator("stringColor", {[keyStyle]: color});
                    if (state) {
                        decorator.clearDecorator();
                        decorator = new TextDecorator("stringColor", {[keyStyle]: color});
                    }
                    decorator.setDecorator();
                }} setValue={setValueState}>
                    <span style={{backgroundColor: "yellow", color: "black"}}> abc </span> <div style={{display: "inline-block", width: "7px", height: "7px", backgroundColor: valueState, border: "1px #fff solid"}}></div>
            </SelectButton>
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