import React from "react";
import Selected from "./Selected";
import TextDecorator from "./TextDecorator";
import { useState } from "react";
import TextDecorButton from "./TextDecorButton";
import Toggler from "./Toggler";


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
            <TextDecorButton conception="bold" state={state.bold}>
                <b>b</b>
            </TextDecorButton>
            <TextDecorButton conception="italic" state={state.italic}>
                <i>i</i>
            </TextDecorButton>
            <TextDecorButton conception="underline" state={state.underline}>
                <u>u</u>
            </TextDecorButton>
            <div id="redactor"
                onPaste={(e)=>{
                    e.preventDefault();

                    let paste = (e.clipboardData || document.clipboardData).getData("text");
                    const text = document.createTextNode(paste);
                    const selection = document.getSelection();
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(text);
                }}
                
                style={{borderSize: "2px", borderColor: "black", borderStyle: "solid", width: "300px", height: "300px" }} 
                contentEditable onInput={(e)=> console.log(e.target.innerHTML)}>
                
                <p data-type="block">1234567890</p>
            </div>
        </div>
    );
}