import React from "react";
import {useState} from "react";
import {Select, SelectButton, ToggleButton, Options, Option} from "./Select";
import TextDecorator from "../controllers/TextDecorator";
import "./color.css";


export default function TextColor({isFromRedactor = false, state = null, concept}) {

    const {defaultValue, values, keyStyle} = concept; 

    const [valueState, setValueState] = useState(defaultValue);

    const options = values.map((color, i) => {
        
            return(
                <Option value={color} className={"color-option"} isDefault={defaultValue === color} key={"textcolor" + i}>
                    <div style={{width: "30px", height: "30px", backgroundColor: color}}></div>
                </Option>
            )
        })

    return(
        <Select className={"color-container"}>
            <SelectButton disabled = { !isFromRedactor ? "disabled" : false }  className={"color-button"} onClick={(color)=> {
                if (!isFromRedactor) return;
                let decorator = new TextDecorator({
                                        tagName: "textColor",
                                        style: {
                                            [keyStyle]: color
                                        }
                            });
                    if (state) {
                        decorator.clearDecorator();
                        decorator = new TextDecorator({
                                        tagName: "textColor",
                                        style: {
                                            [keyStyle]: color
                                        }
                            });
                    }
                    decorator.setDecorator();
                }} setValue={setValueState}>
                    Ab <div style={{display: "inline-block", width: "7px", height: "7px", backgroundColor: valueState, border: "1px #fff solid"}}></div>
            </SelectButton>
            <ToggleButton disabled = { !isFromRedactor ? "disabled" : false } className={"color-toggle"}/>
            <div className={"color-wrap"}>
                <Options className={"color-options"}>
                    <div className={"color-options-inner"}>
                        {options}
                    </div>
                </Options>
            </div>
        </Select>
    )
}