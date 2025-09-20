import React from "react";
import {useState} from "react";
import {Select, SelectButton, ToggleButton, Options, Option} from "./Select";
import TextDecorator from "./TextDecorator";
import "./redactor.css";

const colorCollection = [
    "black",
    "gray",
    "brown",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "darkBlue",
    "purple",
    "darkViolet"
];

export default function TextColor({isFromRedactor = false, state = null}) {

    const [valueState, setValueState] = useState("black");

    const options = colorCollection.map(color => {
        
            return(
                <Option value={color}>
                    <div style={{width: "30px", height: "30px", backgroundColor: color}}></div>
                </Option>
            )
        })

    return(
        <Select defaultValue={"black"} style={{display: "inline-flex", gap: "0.2px"}}>
            <SelectButton disabled = { !isFromRedactor ? "disabled" : false } className="SelectButton SelectButtonLeft" onClick={(color)=> {
                if (!isFromRedactor) return;
                let decorator = new TextDecorator("textColor", {color});
                    if (state) {
                        decorator.clearDecorator();
                        decorator = new TextDecorator("textColor", {color});
                    }
                    decorator.setDecorator();
                }} setValue={setValueState}>
                    A <div style={{display: "inline-block", width: "7px", height: "7px", backgroundColor: valueState, border: "1px #fff solid"}}></div>
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