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



export default function Redactor() {
    
    let selected = new Selected(); 
    const toggler = new Toggler(selected);
    let [state, setState] = useState(toggler.state);



    const keyHandler = (e)=> {
        switch(e.code) {
            case "Enter":
                keyEnterHandler(e);
                break;
            case "ArrowDown":
                keyArrowDownHandler(e);
                break;
            case "ArrowUp":
                keyArrowUpHandler(e);
                break;
            case "ArrowLeft":
                keyArrowLeftHandler(e);
                break;
            case "ArrowRight":
                keyArrowRightHandler(e);
                break;
            default: 
                return;
        }
    };

    
    
    const verticalHandler = ( isTop = false)=> {

        const side = isTop ? "previousElementSibling" : "nextElementSibling";

        return (e) => {
            const selected = new Selected();
            const blockElement = selected.foundationTags.find( tag => tag.dataset.type === "block");
            blockElement.style.display = "inline";
            const lines = blockElement.getClientRects();
            const controlLine = isTop ? lines[0].y : lines[lines.length - 1].y;
            const selectedLine = selected.range.getBoundingClientRect().y;
            const isInControlLine = isTop ? controlLine >= selectedLine : controlLine <= selectedLine;
            console.log(blockElement.getClientRects())
            console.log(selected.range.getBoundingClientRect())
            blockElement.style.display = "block";
            const sibling = blockElement[side];
            
            if (isInControlLine &&
                sibling) {
                    const textNode = selected.findTextNode(sibling, isTop);


                selected.range.setStart(textNode, isTop ? textNode.length : 0);
                selected.range.setEnd(textNode, isTop ? textNode.length : 0);

                selected.selection.removeAllRanges();
                selected.selection.addRange(selected.range);
                e.preventDefault()

            }
        };
        
    };

    const horisontalHandler = ( isTop = false)=> {

        const side = isTop ? "previousElementSibling" : "nextElementSibling";

        return (e) => {
            const selected = new Selected();
            const blockElement = selected.foundationTags.find( tag => tag.dataset.type === "block");
            const textNodes = document.createTreeWalker(blockElement, NodeFilter.SHOW_TEXT);
            
            if(blockElement[side] && ((!isTop && blockElement.dataset.conception === "HEADER2") || isTop) && 
                ( isTop && textNodes.firstChild() === selected.range.startContainer && !selected.range.startOffset || 
                !isTop && textNodes.lastChild() === selected.range.endContainer && selected.range.endContainer.length === selected.range.endOffset)
            ) {
                
                const textNode = selected.findTextNode(blockElement[side], isTop);
                const offset = isTop ? textNode.length : 0;

                selected.range.setStart(textNode, offset);
                selected.range.setEnd(textNode, offset);

                selected.selection.removeAllRanges();
                selected.selection.addRange(selected.range);
                e.preventDefault()
            }
        };
        
    };

    const keyArrowDownHandler = verticalHandler();
    const keyArrowUpHandler = verticalHandler(true);
    const keyArrowLeftHandler = horisontalHandler(true);
    const keyArrowRightHandler = horisontalHandler();

    const keyEnterHandler = (e)=> {
        const selected = new Selected();
        const blockElement = selected.foundationTags.find( tag => tag.dataset.type === "block");
        
        switch(blockElement.dataset.conception) {
            case "HEADER2":
                headerEnterHandler(e);
                break;
            default: 
                return;
        }
    };

    const headerEnterHandler = e => {
        e.preventDefault();
        
        const selected = new TextExtractor();
        selected.extractContent();
        const header2 = selected.foundationTags.find( tag => tag.dataset.conception === "HEADER2")
        console.log("handler")
            console.log(header2.childNodes)
        if (selected.isCollapsed) {
            
            const textNode = document.createTextNode('');
            if (!selected.range.endContainer.nextSibling) {
                selected.range.endContainer.after(document.createElement("br"), textNode, document.createElement("br"));
            } else {
                selected.range.endContainer.after(document.createElement("br"), textNode);
            }
            
            selected.range.setEnd(textNode, 0);
            selected.range.setStart(textNode, 0);
                            
            
        } else {
            const br = document.createElement("br");
            const textNode = document.createTextNode('');
            selected.begin.after(br, textNode);
            selected.range.setEnd(textNode, 0);
            selected.range.setStart(textNode, 0);
        }

        selected.changeSelection();
        
    }

    

    document.onselectionchange = ()=> {
        
        selected = new Selected();
        const toggler = new Toggler(selected);
        setState(toggler.state);
        

        if (selected.redactor && selected.foundation === selected.redactor && selected.isCollapsed) {
            const decorator = new TextDecorator("paragraph");
            const range = decorator.range;
            let wrapper;

            if(selected.redactor.querySelector(`*[data-conception="PARAGRAPH"]`)) {
                wrapper = selected.redactor.querySelector(`*[data-conception="PARAGRAPH"]`);
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

    return(
        <div>
            <div style={{display: "flex", gap: "3px", margin: "5px"}}>
                <button onClick={setHeader}>Заголовок</button>
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

            onKeyDown = {keyHandler}

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