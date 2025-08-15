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

    const defineSeparation = (range, isEnd = false) => {
        const side =  {
            offset: isEnd ? "endOffset" : "startOffset", 
            child: isEnd ? "lastChild" : "firstChild"
        }
        let node = range.startContainer;
        const foundation = range.commonAncestorContainer;
        const redactor = document.getElementById("redactor");
        let child = node;
        let parent = node.parentElement;
        let isSeparated = false; 
        if (foundation === redactor && range[side.offset] === 0) {
            isSeparated = true;
            while( parent !== redactor) {
                if (parent[side.child] !== child) {
                    isSeparated = false;
                    break;
                }
                child = parent;
                parent = parent.parentElement;
            }
        }
        return isSeparated;
    }

    const splitString = (string, indexes) => {
        if (indexes.length < 2) return [string];
        const result = [];
        let start = null;
        for(let i of indexes) {
            if (start === null) {
                start = i;
                continue;
            }
            result.push(string.slice(start, i));
            start = i;
        }
        return result;
    }


    const cancelStrong = (range, selection)=> {
        const redactor = document.getElementById("redactor");
        let node = range.startContainer;
        const foundation = range.commonAncestorContainer;
        
        const isBegin = defineSeparation(range);
        const isEnd = defineSeparation(range, true); 

        if (range.startContainer === range.endContainer) {
            const textParts = splitString(node.data, [0, range.startOffset, range.endOffset, node.data.length]);
            node.data = textParts[0];
            const middleNode = document.createTextNode(textParts[1]);
            const endNode = document.createTextNode(textParts[2]);
            node.after(middleNode, endNode);
            range.setStart(middleNode, 0);
            range.setEnd(middleNode, middleNode.length);
            console.log("ddd")
        }

        const fragment = range.extractContents();
        let start = fragment.firstChild;
        console.log(...fragment.childNodes)
        
        let end = fragment.lastChild;
        let endOffset = range.endOffset;
        const elements = fragment.querySelectorAll("STRONG");
        console.log(node.parentElement)
        for (let element of elements) {
            element.replaceWith(...element.childNodes);
        }

        
        let sibling = node.parentElement;
        if (foundation !== redactor || isBegin) {
            if (isBegin || selected.startTags.length) {
                node.parentElement.after(fragment);
                range.setStart(node.parentElement.nextSibling, 0);
            }
            else {
                node.after(fragment);
                range.setStart(node.nextSibling, 0);
                console.log("putted here")
            }
        } else {
            sibling = node.parentElement.closest("p");
            let offset = sibling.childNodes.length;
            sibling.append(...start.childNodes);
            sibling.after(fragment);
            range.setStart(sibling, offset);
        }
        

        if (end instanceof HTMLElement) {
            endOffset = end.childNodes.length;
        } else {
            endOffset = end.length;
        }

        if (foundation === redactor && !isEnd) {
            let sibling = end.nextSibling;
            end.append(...sibling.childNodes);
        }
        

        range.setEnd(end, endOffset)
        selection.removeAllRanges();
        selection.addRange(range);
        selected = new Selected();

        const lastStrong = selected.foundationTags.findLastIndex(tag => tag.tagName === "STRONG");
        console.log(selected)
        if (!(lastStrong + 1)) return;

        const findLimits = (tag, start, end)=> {
            const limits = [];
            for (let i = 0; i < tag.childNodes.length; i++) {
                if (tag.childNodes[i] === start) limits[0] = i;
                if (tag.childNodes[i] === end) {
                    limits[1] = i;
                    break;
                }
            
            }
            return limits;
        }

        let tag = selected.foundationTags[0];
        let [startIndex, endIndex] = findLimits(tag, start, end);
        
        const middleClone = (tag.tagName === "STRONG") ? new DocumentFragment() : tag.cloneNode(false);
        const endClone = tag.cloneNode(false);
        const children = Array.from(tag.childNodes);
        const forMiddleClone = children.slice(startIndex, ++endIndex);
        const forEndClone = children.slice(endIndex);
        console.log(selected)
        middleClone.append(...forMiddleClone);
        endClone.append(...forEndClone);
        tag.after(middleClone, endClone);
        start = tag.nextSibling;
        end = endClone.previousSibling;

        for (let i = 1; i <= lastStrong; i++) {
            let tag = selected.foundationTags[i];
            let [startIndex, endIndex] = findLimits(tag, start, end);

            const middleClone = (tag.tagName === "STRONG") ? new DocumentFragment() : tag.cloneNode(false);
            const endClone = tag.cloneNode(false);
            const children = Array.from(tag.childNodes);
            const forMiddleClone = children.slice(startIndex, ++endIndex);
            const forEndClone = children.slice(endIndex);
            middleClone.append(...forMiddleClone);
            endClone.append(...forEndClone);
            tag.after(middleClone, endClone);
            start = tag.nextSibling;
            end = endClone.previousSibling;

        }

        range.setStart(start, 0);
        if (end instanceof HTMLElement) {
            range.setEnd(end, end.childNodes.length);
            console.log("fffffffff")
        } else {
            range.setEnd(end, end.data.length);
            console.log("lllllllll")
        }

        selection.removeAllRanges();
        selection.addRange(range);
        selected = new Selected();
        
        console.log(range.toString())
    }

    const setStyle1 =( range ) => {
        
        const redactor = document.getElementById("redactor");
        let node = range.startContainer;
        const foundation = range.commonAncestorContainer;
        
        const isBegin = defineSeparation(range);
        const isEnd = defineSeparation(range, true); 

        
        if (range.startContainer.parentElement === range.endContainer.parentElement) return wrapIn("strong")(range);

        const fragment = range.extractContents();
        let start = fragment.firstChild;
        console.log(...fragment.childNodes)
        
        let end = fragment.lastChild;
        let endOffset = range.endOffset;
        if (foundation === redactor) {
            let children = Array.from(fragment.children);
            console.log(children)
            for(let element of children) {
                const wrapper = document.createElement("STRONG");
                wrapper.append(...element.childNodes);
                element.append(wrapper);
            }
        } 
        
        let sibling = node.parentElement;
        if (foundation !== redactor || isBegin) {
            if (isBegin || selected.startTags.length) {
                node.parentElement.after(fragment);
                range.setStart(node.parentElement.nextSibling, 0);
            }
            else {
                node.after(fragment);
                range.setStart(node.nextSibling, 0);
                console.log("putted here")
            }
        } else {
            sibling = node.parentElement.closest("p");
            let offset = sibling.childNodes.length;
            sibling.append(...start.childNodes);
            sibling.after(fragment);
            range.setStart(sibling, offset);
        }
        

        if (end instanceof HTMLElement) {
            endOffset = end.childNodes.length;
        } else {
            endOffset = end.length;
        }

        if (foundation === redactor && !isEnd) {
            let sibling = end.nextSibling;
            end.append(...sibling.childNodes);
        }
        

        range.setEnd(end, endOffset);

        if (foundation !== redactor) wrapIn("strong")(range);

        const selection = document.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        selected = new Selected();

    }
    
    const setStyle = ( range ) => {
        if (!range) return;
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
                    setStyle1(selected.range);
                    
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
                
                <p>1 Пример <i>с италиком <strong>для коррекции</strong> этого</i> алгоритма</p>
                <p>1 Пример <i>с италиком <strong>для коррекции</strong></i> этого алгоритма</p>
                <p>1 Пример <strong><i>с италиком для </i>коррекции </strong>этого алгоритма</p>
                <p>2 Пример <strong>для</strong> коррекции алгоритма</p>
            </div>
        </div>
    );
}