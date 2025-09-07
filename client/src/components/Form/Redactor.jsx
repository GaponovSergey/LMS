import React from "react";
import Selected from "./Selected";
import TextDecorator from "./TextDecorator";
import { useState } from "react";


export default function Redactor() {
    
    let selected = new Selected(); 
    let [state, setState] = useState(false);

    document.onselectionchange = ()=> {
        selected = new Selected();

        if (selected.startTags.find(tag => tag.dataset?.conception === "BOLD") ||
            selected.endTags.find(tag => tag.dataset?.conception === "BOLD")   ||
            selected.foundationTags.find(tag => tag.dataset?.conception === "BOLD") ||
            selected.tags.STRONG.length) {
                setState(true);
                console.log(state);
            }
        else {
            setState(false)
            console.log(state);
        }

        if (selected.redactor && selected.foundation === selected.redactor && selected.isCollapsed) {
            let wrapper = document.createElement("P");
            wrapper.dataset.type = "block";
            const range = selected.range;
            if(selected.redactor.querySelector("P")) wrapper = selected.redactor.querySelector("P");
            else range.surroundContents(wrapper);
            console.log("ddd")
            range.setStart(wrapper, 0);
            range.setEnd(wrapper, 0);
            selected.selection.removeAllRanges();
            selected.selection.addRange(range);
        }
    }

    return(
        <div>
            {!state ? <button onClick={()=> { 
                    const textDecorator = new TextDecorator("bold");
                    textDecorator.setDecorator();
                    }}>b</button> :
            <button onClick={()=> {
                    const textDecorator = new TextDecorator("bold");
                    textDecorator.clearDecorator();
            }}>x</button>}
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
                
                
            </div>
        </div>
    );
}