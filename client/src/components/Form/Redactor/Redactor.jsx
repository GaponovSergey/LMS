import React from "react";
import Selected from "./Selected";
import { useState } from "react";
import TextDecorButton from "./TextDecorButton";
import Toggler from "./Toggler";
import TextColor from "./TextColor";
import StringColor from "./StringColor";
import collection from "./tagsCollection";
import FontFamily from "./FontFamily";
import FontSize from "./FontSize";



export default function Redactor() {
    
    let selected = new Selected(); 
    const toggler = new Toggler(selected);
    let [state, setState] = useState(toggler.state);

    document.onselectionchange = ()=> {
        selected = new Selected();
        const toggler = new Toggler(selected);
        setState(toggler.state);
        

        if (selected.redactor && selected.foundation === selected.redactor && selected.isCollapsed) {
            let wrapper = document.createElement("P");
            wrapper.dataset.type = "block";
            wrapper.dataset.conception = "PARAGRAPH";
            const range = selected.range;
            if(selected.redactor.querySelector("P")) wrapper = selected.redactor.querySelector("P");
            else range.surroundContents(wrapper);
            range.setStart(wrapper, 0);
            range.setEnd(wrapper, 0);
            selected.selection.removeAllRanges();
            selected.selection.addRange(range);
        }
    }

    return(
        <div>
            <div style={{display: "flex", gap: "3px", margin: "5px"}}>
            <TextDecorButton conception="bold" isFromRedactor={state.isFromRedactor} state={state.bold}>
                <b>b</b>
            </TextDecorButton>
            <TextDecorButton conception="italic" isFromRedactor={state.isFromRedactor} state={state.italic}>
                <i>i</i>
            </TextDecorButton>
            <TextDecorButton conception="underline" isFromRedactor={state.isFromRedactor} state={state.underline}>
                <u>u</u>
            </TextDecorButton>
            <TextColor isFromRedactor={state.isFromRedactor} state={state.textColor} concept={collection.textColor} />
            <StringColor isFromRedactor={state.isFromRedactor} state={state.stringColor} concept={collection.stringColor} />
            <FontFamily isFromRedactor={state.isFromRedactor} state={state.fontFamily} concept={collection.fontFamily} />
            <FontSize isFromRedactor={state.isFromRedactor} state={state.fontSize} concept={collection.fontSize} />
            </div>
            <div id="redactor"
                onPaste={(e)=>{
                    e.preventDefault();

                    let paste = (e.clipboardData || document.clipboardData).getData("text");
                    const text = document.createTextNode(paste);
                    const selection = document.getSelection();
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(text);
                }}
                
                style={{borderSize: "2px", borderColor: "black", borderStyle: "solid", width: "300px", height: "300px", margin: "0" }} 
                contentEditable onInput={(e)=> console.log(e.target.innerHTML)} >
                
                
            </div>
        </div>
    );
}