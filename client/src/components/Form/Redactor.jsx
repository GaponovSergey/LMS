import React from "react";
import Selected from "./Selected";


export default function Redactor() {
    
    let selected = new Selected(); 
    
    const wrapIn = (element) => {
        return (range) => {
            const modified = document.createElement(element);
            console.log(range);
            range.surroundContents(modified);
        }
    }

    const splitString = (string, index) => {
        return [string.slice(0, index), string.slice(index) ];
    }

    const cancelStrong = (range, selection)=> {
        let node = range.startContainer;
        let endContainer = range.endContainer;
        let endOffset = range.endOffset;
        let fragment = new Range();
        console.log(range.endContainer)
        if (node.parentElement.nodeName === "STRONG") {
            const [firstPart, lastPart] = splitString( node.nodeValue, range.startOffset);
            let sibling = node.parentElement.nextSibling;
            if (sibling.nodeName === "#text") {
                sibling.nodeValue = lastPart + sibling.nodeValue;
                node.nodeValue = firstPart;
                range.setStart(sibling, 0);
                
                if (sibling === endContainer) {
                    range.setEnd(endContainer, endOffset + lastPart.length);
                }
                
                selection.removeAllRanges();
                selection.addRange(range);
                node = sibling;
                console.log(range.endContainer)
            }
        }
        while (node.nextSibling !== null && node.nextSibling !== range.endContainer) {
            node = node.nextSibling;
            if (node.nodeName === "STRONG") {
                node.replaceWith(node.innerHTML);
            }
        }
    }
    
    const setStyle = ( range ) => {

        if (range.startContainer.parentElement === range.endContainer.parentElement) return wrapIn("strong")(range);

        const foundation = range.commonAncestorContainer;

        let child = null;
        let node = range.startContainer.parentElement;
        let fragment = range.cloneRange();

        while (node !== foundation) {

            if (child !== null) {
                fragment.setStart(child.nextSibling, 0)
            }

            fragment.setEnd(node, node.childNodes.length);
            wrapIn("strong")(fragment);

            do {
                child = node;
                node = node.parentElement;
            } while (!node.nextSibling && node !== foundation)

        }

        let endChild = null;
        let end = range.endContainer.parentElement;
        fragment = range.cloneRange();

        while (end !== foundation) {

            if (endChild !== null) {
                let elements = Array.from(end.childNodes);
                let index = elements.findIndex( element => element === endChild.previousSibling);
                fragment.setEnd(end, index + 1);
            }

            fragment.setStart(end, 0);
            wrapIn("strong")(fragment);

             do {
                endChild = end;
                end = end.parentElement;
            } while (!end.previousSibling && end !== foundation)

        }

        if (child?.nextSibling !== endChild) {
            let elements = Array.from(foundation.childNodes);
            let start = elements.findIndex(element => element === child.nextSibling);
            let end = elements.findIndex(element => element === endChild);
            for (let i = start; i < end; i++) {
                fragment.setStart(elements[i], 0);
                if (elements[i] instanceof HTMLElement) {
                    fragment.setEnd(elements[i], elements[i].childNodes.length);
                } else {
                    fragment.setEnd(elements[i], elements[i].length)
                }
                
                wrapIn("strong")(fragment);
            }
            
        }
        
    }

    document.onselectionchange = ()=> {
        selected = new Selected();
    }

    return(
        <div>
            <button onClick={()=> { 
                    setStyle(selected.range);
                    
                    console.log(document.getSelection())}}>b</button>
            <button onClick={()=> {
                    cancelStrong(selected.range, selected.selection);
            }}>x</button>
            <div id="redactor"
                onSelect={ (e)=> {
                    if (e.target.innerHTML.length === 0) {
                        const selection = document.getSelection();
                        const range = new Range();
                        range.setStart(selection.anchorNode, 0);
                        range.setEnd(selection.focusNode, selection.focusOffset);
                        const p = document.createElement("p");
                        range.surroundContents(p);
                        selection.collapse(p, p.innerHTML.length)
                        console.log(e.target.innerHTML)
                    }
                }}
                onKeyUp={(e)=> {
                    if (e.code == "Enter") {
                        console.log("enter")
                    }
                }}
                
                style={{borderSize: "2px", borderColor: "black", borderStyle: "solid", width: "300px", height: "300px" }} 
                contentEditable onInput={(e)=> console.log(e.target.innerHTML)}>
                
                
            </div>
        </div>
    );
}