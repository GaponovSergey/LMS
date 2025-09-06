import React from "react";
import Selected from "./Selected";


export default function Redactor() {
    
    let selected = new Selected(); 

    const strong = {
        tag: "STRONG",
        data: {
            type: "inline",
            tag: "STRONG"
            },
        style: {

            },
        attributes: {
            
        }
    };

    const initElement = (props) => {

        return ()=> {
            const element = document.createElement(props.tag);
            for (let key in props.data) {
                element.dataset[key] = props.data[key];
            }

            return element;
        }
    }
    
    const defineSeparation = (range, isEnd = false) => {
        const side =  {
            offset: isEnd ? "endOffset" : "startOffset", 
            child: isEnd ? "lastChild" : "firstChild"
        }
        let node = range.startContainer;
        const foundation = range.commonAncestorContainer;
        const redactor = document.getElementById("redactor");//=======================================
        let child = node;
        let parent = node.parentElement;
        let isSeparated = false; 
        if (foundation === redactor && range[side.offset] === (isEnd ? node.length : 0)) {
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

    const closestBlock = (node) => {
            const redactor = document.getElementById("redactor");//================================
            let child = node;
            while (node !== redactor) {
                child = node;
                node = node.parentElement;
            }
            return child;
        }

    const findTextNode = (node, isEnd = false) => {
        while (node instanceof HTMLElement) {
            node = isEnd ? node.lastChild : node.firstChild;
        }
        return node;
    }

    const checkToRemove = (node) => {
        if(!node.childNodes.length       || 
            node.childNodes.length === 1 && 
            (!selected.findTextNode(node.childNodes[0]) || 
              selected.findTextNode(node.childNodes[0]).data === "")
        ) {
                return true;
        }
        return false;
    }

    const changeSelection = (range) => {
        const selection = document.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    const separateSelected = (range) => {
            const start = range.startContainer;
            const textParts = splitString(start.data, [0, range.startOffset, range.endOffset, start.data.length]);
            start.data = textParts[0];
            const middleNode = document.createTextNode(textParts[1]);
            const endNode = document.createTextNode(textParts[2]);
            start.after(middleNode, endNode);
            range.setStart(middleNode, 0);
            range.setEnd(middleNode, middleNode.length);
    }

    const cancelStrong = (range)=> {
        console.log(range)
        console.log(selected)
        const redactor = document.getElementById("redactor");//================================================
        let node = range.startContainer;
        let foundation = range.commonAncestorContainer;

        if (range.startContainer === range.endContainer && 
            range.startOffset !== 0 && 
            range.endOffset !== range.endContainer.data.length) {
            console.log(" cancel step 1")
            separateSelected(range);
        }
                
        const isBegin = defineSeparation(range);
        const isEnd = defineSeparation(range, true); 

        const fragment = range.extractContents();
        if (selected.isCollapsed) fragment.append(document.createTextNode(""));
        let start = fragment.firstChild;
        console.log(fragment)
        
        let end = selected.findTextNode(fragment.lastChild, true);
        const endElement = fragment.lastChild;
        let endOffset = range.endOffset;
        const elements = fragment.querySelectorAll("STRONG"); //=========================================

        for (let element of elements) {
            console.log(" cancel step 2")
            element.replaceWith(...element.childNodes);
            element.remove();
        }

        range = new Range();
        if (foundation !== redactor || isBegin) {
            if (isBegin || selected.startTags.length) {
                console.log(" cancel step 3")
                const beforeStart = selected.startTags[selected.startTags.length - 1];
            
                beforeStart.after(fragment);
                range.setStart(beforeStart.nextSibling, 0);
                if (checkToRemove(beforeStart)) {
                        console.log(" cancel step 3.1")
                        beforeStart.remove();
                }
                
            }
            else {
                console.log(" cancel step 4")
                node.after(fragment);
                console.log(node.nextSibling)
                range.setStart(node.nextSibling, 0);
                if(node.data === "") {
                    node.remove();
                }
            }
        } else {
            console.log(" cancel step 5")
            let sibling = closestBlock(node);
            let offset = sibling.childNodes.length;
            sibling.append(...start.childNodes);
            start.remove();
            sibling.after(fragment);
            range.setStart(sibling, offset);
        }
    
        console.log(" cancel step 7")
        endOffset = end.length;

        if (foundation === redactor && !isEnd) {
            console.log(" cancel step 8")
            let sibling = endElement.nextSibling;
            endElement.append(...sibling.childNodes);
            sibling.remove();
        }

        range.setEnd(end, endOffset)
        changeSelection(range);

        const lastStrong = selected.foundationTags.findLastIndex(tag => tag.tagName === "STRONG"); //==============================
        
        if (!(lastStrong + 1)) return;
        console.log(" cancel step 9")
        end = endElement;

        const findLimits = (tag, start, end)=> {
            const limits = [null, null];
            for (let i = 0; i < tag.childNodes.length; i++) {
                if (tag.childNodes[i] === start) limits[0] = i;
                if (tag.childNodes[i] === end) {
                    limits[1] = i;
                    break;
                }
            
            }
            return limits;
        }

        for (let i = 0; i <= lastStrong; i++) {
            let tag = selected.foundationTags[i];
            let [startIndex, endIndex] = findLimits(tag, start, end);
            const middleClone = (tag.tagName === "STRONG") ? new DocumentFragment() : tag.cloneNode(false);//========================
            console.log(" cancel step 10")
            
            const children = Array.from(tag.childNodes);
            const forMiddleClone = children.slice(startIndex, ++endIndex);
            middleClone.append(...forMiddleClone);
            
            tag.after(middleClone);

            if (endIndex !== children.length) {
                console.log(" cancel step 11")
                const endClone = tag.cloneNode(false);
                const forEndClone = children.slice(endIndex);
                endClone.append(...forEndClone);
                end = (middleClone instanceof DocumentFragment) ? children[--endIndex] : middleClone;
                
                
                if (!checkToRemove(endClone)) {
                    console.log(" cancel step 11.1.1")
                    end.after(endClone);
                }  
            }

            start = tag.nextSibling;
            
            if (checkToRemove(tag)) {
                console.log(" cancel step 12")
                tag.remove();
            }
        }

        range = new Range();
        range.setStart(start, 0);
        if (end instanceof HTMLElement) {
            console.log(" cancel step 14")
            range.setEnd(end, end.childNodes.length);
        } else {
            console.log(" cancel step 15")
            range.setEnd(end, end.data.length);
        }
        
        changeSelection(range);
    }

    const setStyle = ( range, createElement ) => {
        console.log(range)
        console.log(selected)
        if (selected.isCollapsed) {
            console.log("step 0")
            const wrapper = createElement();
            range.surroundContents(wrapper);
            console.log(wrapper)
            range.setStart(wrapper, 0);
            range.setEnd(wrapper, 0);
            return changeSelection(range);
        }

        const redactor = document.getElementById("redactor");//================================================
        let node = range.startContainer;
        let foundation = range.commonAncestorContainer;

        if (range.startContainer === range.endContainer ) {
            console.log("step 1")
            separateSelected(range);           
        }

        const isBegin = defineSeparation(range);
        const isEnd = defineSeparation(range, true); 

        const fragment = range.extractContents();
        
        let start = fragment.firstChild;
        
        let end = fragment.lastChild;
        let endOffset = range.endOffset;
        if (foundation === redactor) {
            let children = Array.from(fragment.children);
            console.log("step 2")
            for(let element of children) {
                const wrapper = createElement();
                wrapper.append(...element.childNodes);
                element.append(wrapper);
            }
        } else {
            console.log("step 3")
            const wrapper = createElement();
            wrapper.append(...fragment.childNodes);
            fragment.append(wrapper)
        }
        
        range = new Range();
        if (foundation !== redactor || isBegin) {
            console.log("step 4")
            if (isBegin || selected.startTags.length) {
                console.log("step 5")
                const beforeStart = node.parentElement;
                beforeStart.after(fragment);
                range.setStart(beforeStart.nextSibling, 0);
                if(checkToRemove(beforeStart)) {
                    console.log(" cancel step 3.1")
                    beforeStart.remove();
                }
            }
            else {
                console.log("step 6")
                node.after(fragment);
                range.setStart(node.nextSibling, 0);
            }
        } else {
            console.log("step 7")
            let sibling = closestBlock(node); 
            let offset = sibling.childNodes.length;
            sibling.append(...start.childNodes);
            start.remove();
            sibling.after(fragment);
            range.setStart(sibling, offset);
        }

        if (end instanceof HTMLElement) {
            console.log("step 8")
            endOffset = end.childNodes.length;
        } else {
            console.log("step 9")
            endOffset = end.length;
        }

        if (foundation === redactor && !isEnd) {
            console.log("step 10")
            let sibling = end.nextSibling;
            end.append(...sibling.childNodes);
            sibling.remove();
        }
        
        range.setEnd(end, endOffset);
        changeSelection(range);
    }

    document.onselectionchange = ()=> {
        selected = new Selected();
        console.log(selected)
        console.log(selected.redactor?.querySelector("P"))
        if (selected.redactor && selected.foundation === selected.redactor && selected.isCollapsed) {
            let wrapper = document.createElement("P");
            const range = selected.range;
            if(selected.redactor.querySelector("P")) wrapper = selected.redactor.querySelector("P");
            else range.surroundContents(wrapper);
            console.log("ddd")
            range.setStart(wrapper, 0);
            range.setEnd(wrapper, 0);
            changeSelection(range);
        }
    }

    return(
        <div>
            <button onClick={()=> { 
                    setStyle(selected.range, initElement(strong));
                    
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