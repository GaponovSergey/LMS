import React from "react";


export default function Redactor() {

    const setUncollapsedRange = (selection) => {
        const range = new Range();
        range.setStart(selection.anchorNode, selection.anchorOffset);
        range.setEnd(selection.focusNode, selection.focusOffset);

        if (range.collapsed) {
            range.setEnd(selection.anchorNode, selection.anchorOffset);
            range.setStart(selection.focusNode, selection.focusOffset);
        }
        return range;
    }

    const wrapIn = (element) => {
        return (range) => {
            const modified = document.createElement(element);
            console.log(range);
            range.surroundContents(modified);
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

            if (node.lastChild instanceof HTMLElement) {
                fragment.setEnd(node, node.childNodes.length);
            } else {
                fragment.setEnd(node.lastChild, node.lastChild.length);
            }
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

        if (child.nextSibling !== endChild) {
            let elements = Array.from(foundation.childNodes);
            let start = elements.findIndex(element => element === child.nextSibling);
            let end = elements.findIndex(element => element === endChild);
            fragment.setStart(foundation, start);
            fragment.setEnd(foundation, end);
            wrapIn("strong")(fragment);
        }
        
    }

    return(
        <div>
            <button onClick={()=> { 
                    const selection = document.getSelection();
                    const range = setUncollapsedRange(selection);
                    setStyle(range);
                    
                    console.log(document.getSelection())}}>b</button>
            <div 
                onSelect={ (e)=> {
                    if (e.target.innerHTML.length === 1) {
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