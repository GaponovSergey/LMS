import React from "react";
import Selected from "./Selected";
import Header from "./Header";
import { useState } from "react";
import TextDecorButton from "./TextDecorButton";
import Toggler from "./Toggler";
import TextColor from "./TextColor";
import StringColor from "./StringColor";
import collection from "./tagsCollection";
import FontFamily from "./FontFamily";
import FontSize from "./FontSize";
import TextExtractor from "./TextExtractor";
import TextDecorator from "./TextDecorator";
import Handler from "./Handler";
import List from "./List";



export default function Redactor() {
    
    const toggler = new Toggler();
    let [state, setState] = useState(toggler.state);

    document.onselectionchange = ()=> {
        console.log("selectionchange")

        const brs = document.querySelectorAll("#redactor > br");

        for (let br of brs) {
            br.remove();
        }

        const toggler = new Toggler();
        setState(toggler.state);
        
        if (toggler.redactor && toggler.foundation === toggler.redactor && toggler.isCollapsed) {
            const decorator = new TextDecorator({tagName: "paragraph"});
            const range = decorator.range;
            let wrapper;

            if(decorator.redactor.querySelector(`*[data-conception="PARAGRAPH"]`)) {
                wrapper = decorator.redactor.querySelector(`*[data-conception="PARAGRAPH"]`);
            }  else {
                
                wrapper = decorator.createElement();
                wrapper.append(document.createTextNode(""));
                decorator.redactor.append(wrapper);
            }

            const textNode = decorator.findTextNode(wrapper);
            range.setStart(textNode, 0);
            range.setEnd(textNode, 0);
            decorator.changeSelection();
        }
    }

    const setHeader = ()=> {
        const decorator = new Header();
        decorator.setHeader();
    }

    const setList = (tag)=> {

        return ()=> {
            const list = new List(tag);
            list.setList();
        } 
    }

    return(
        <div>
            <div style={{display: "flex", gap: "3px", margin: "5px"}}>
                <button onClick={setHeader} disabled = { !state.isFromRedactor || state.blockElement === "HEADER2" || state.isMultiblockSelected ? "disabled" : false }>Заголовок</button>
                <button onClick={setList("ol")} disabled = { !state.isFromRedactor  ? "disabled" : false }>Нумерованный список</button>
                <button onClick={setList("ul")} disabled = { !state.isFromRedactor  ? "disabled" : false }>Ненумерованный список</button>
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

            onKeyDown = { e => {
                const handler = new Handler();
                handler.keyHandler(e);
            }}


            onPaste={ (e)=>{
                    e.preventDefault();

                    let paste = (e.clipboardData || document.clipboardData).getData("text");
                    const text = document.createTextNode(paste);
                    const selection = document.getSelection();
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(text);
                }
            }
                
                style={{borderSize: "2px", borderColor: "black", borderStyle: "solid", width: "300px", height: "300px", margin: "0" }} 
                contentEditable onInput={(e)=> e.preventDefault()} >
                
                
            </div>
        </div>
    );
}