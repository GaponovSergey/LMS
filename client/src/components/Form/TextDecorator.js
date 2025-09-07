import collection from "./tagsCollection";
import Selected from "./Selected";

export default class TextDecorator extends Selected {

    tag = {};

    constructor(tagName) {
        super();
        this.tag = collection[tagName];
    }

    _createElement() {
        const element = document.createElement(this.tag.tagName);

        for (let key in this.tag.data) {
            element.dataset[key] = this.tag.data[key];
        }

        for (let key in this.tag.style) {
            element.style[key] = this.tag.style[key];
        }

        return element;
    }

    _defineSeparation(isEnd = false) {
        const side =  {
            offset: isEnd ? "endOffset" : "startOffset", 
            child: isEnd ? "lastChild" : "firstChild"
        }
        let node = this.range.startContainer;
        let child = node;
        let parent = node.parentElement;
        let isSeparated = false; 
        if (this.foundation === this.redactor && this.range[side.offset] === (isEnd ? node.length : 0)) {
            isSeparated = true;
            while( parent !== this.redactor) {
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

    splitString(string, indexes) {
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

    _closestBlock(node) {
            
        let child = node;
        while (node !== this.redactor) {
            child = node;
            node = node.parentElement;
        }
        return child;
    }

    _checkToRemove = (node) => {
        if(!node.childNodes.length       || 
            node.childNodes.length === 1 && 
            (!this.findTextNode(node.childNodes[0]) || 
              this.findTextNode(node.childNodes[0]).data === "")
        ) {
                return true;
        }
        return false;
    }

    _changeSelection() {
        this.selection.removeAllRanges();
        this.selection.addRange(this.range);
    }

    _separateSelected() {
            const start = this.range.startContainer;
            const textParts = this.splitString(start.data, [0, this.range.startOffset, this.range.endOffset, start.data.length]);
            start.data = textParts[0];
            const middleNode = document.createTextNode(textParts[1]);
            const endNode = document.createTextNode(textParts[2]);
            start.after(middleNode, endNode);
            this.range.setStart(middleNode, 0);
            this.range.setEnd(middleNode, middleNode.length);
    }

    _findLimits(tag, start, end) {
        const limits = [0, 0];
        for (let i = 0; i < tag.childNodes.length; i++) {
            if (tag.childNodes[i] === start) limits[0] = i;
            if (tag.childNodes[i] === end) {
                limits[1] = i;
                break;
            }    
        }
        return limits;
    }

    setDecorator() {
        console.log(this.range)
        if (this.isCollapsed) {
            console.log("step 0")
            const wrapper = this._createElement();
            this.range.surroundContents(wrapper);
            console.log(wrapper)
            this.range.setStart(wrapper, 0);
            this.range.setEnd(wrapper, 0);
            return this._changeSelection(this.range);
        }

        let node = this.range.startContainer;

        if (this.range.startContainer === this.range.endContainer ) {
            console.log("step 1")
            this._separateSelected();           
        }

        const isBegin = this._defineSeparation();
        const isEnd = this._defineSeparation(true); 

        const fragment = this.range.extractContents();
        
        let start = fragment.firstChild;
        
        let end = fragment.lastChild;
        let endOffset = this.range.endOffset;
        if (this.foundation === this.redactor) {
            let children = Array.from(fragment.children);
            console.log("step 2")
            for(let element of children) {
                const wrapper = this._createElement();
                wrapper.append(...element.childNodes);
                element.append(wrapper);
            }
        } else {
            console.log("step 3")
            const wrapper = this._createElement();
            wrapper.append(...fragment.childNodes);
            fragment.append(wrapper)
        }
        
        if (this.foundation !== this.redactor || isBegin) {
            console.log("step 4")
            if (isBegin || this.startTags.length) {
                console.log("step 5")
                const beforeStart = node.parentElement;
                beforeStart.after(fragment);
                this.range.setStart(beforeStart.nextSibling, 0);
                if(this._checkToRemove(beforeStart)) {
                    console.log(" cancel step 3.1")
                    beforeStart.remove();
                }
            }
            else {
                console.log("step 6")
                node.after(fragment);
                this.range.setStart(node.nextSibling, 0);
            }
        } else {
            console.log("step 7")
            let sibling = this._closestBlock(node); 
            let offset = sibling.childNodes.length;
            sibling.append(...start.childNodes);
            start.remove();
            sibling.after(fragment);
            this.range.setStart(sibling, offset);
        }

        if (end instanceof HTMLElement) {
            console.log("step 8")
            endOffset = end.childNodes.length;
        } else {
            console.log("step 9")
            endOffset = end.length;
        }

        if (this.foundation === this.redactor && !isEnd) {
            console.log("step 10")
            let sibling = end.nextSibling;
            end.append(...sibling.childNodes);
            sibling.remove();
        }
        
        this.range.setEnd(end, endOffset);
        this._changeSelection();
    }

    clearDecorator() {
        console.log(this.range)
        let node = this.range.startContainer;

        if (this.range.startContainer === this.range.endContainer && 
            this.range.startOffset !== 0 && 
            this.range.endOffset !== this.range.endContainer.data.length) {
            console.log(" cancel step 1")
            this._separateSelected();
        }
                
        const isBegin = this._defineSeparation();
        const isEnd = this._defineSeparation(true); 

        const fragment = this.range.extractContents();
        if (this.isCollapsed) fragment.append(document.createTextNode(""));
        let start = fragment.firstChild;
        console.log(fragment)
        
        let end = this.findTextNode(fragment.lastChild, true);
        const endElement = fragment.lastChild;
        let endOffset = this.range.endOffset;
        const elements = fragment.querySelectorAll(`*[data-conception="${this.tag.data.conception}"]`); //=========================================

        for (let element of elements) {
            console.log(" cancel step 2")
            element.replaceWith(...element.childNodes);
            element.remove();
        }

        if (this.foundation !== this.redactor || isBegin) {
            if (isBegin || this.startTags.length) {
                console.log(" cancel step 3")
                const beforeStart = this.startTags[this.startTags.length - 1];
            
                beforeStart.after(fragment);
                this.range.setStart(beforeStart.nextSibling, 0);
                if (this._checkToRemove(beforeStart)) {
                    console.log(" cancel step 3.1")
                    beforeStart.remove();
                }
                
            }
            else {
                console.log(" cancel step 4")
                node.after(fragment);
                console.log(node.nextSibling)
                this.range.setStart(node.nextSibling, 0);
                if(node.data === "") {
                    node.remove();
                }
            }
        } else {
            console.log(" cancel step 5")
            let sibling = this._closestBlock(node);
            let offset = sibling.childNodes.length;
            sibling.append(...start.childNodes);
            start.remove();
            sibling.after(fragment);
            this.range.setStart(sibling, offset);
        }
    
        console.log(" cancel step 7")
        endOffset = end.length;

        if (this.foundation === this.redactor && !isEnd) {
            console.log(" cancel step 8")
            let sibling = endElement.nextSibling;
            endElement.append(...sibling.childNodes);
            sibling.remove();
        }

        for (let tag of this.startTags) {
            if (this._checkToRemove(tag)) {
                tag.remove();
            }
        }
        for (let tag of this.endTags) {
            if (this._checkToRemove(tag)) {
                tag.remove();
            }
        }

        this.range.setEnd(end, endOffset)
        this._changeSelection();
        console.log("ttttttttttttttttttttttttttt")
        const lastStrong = this.foundationTags.findLastIndex(tag => tag.dataset.conception === this.tag.data.conception); //==============================
        
        if (!(lastStrong + 1)) return;
        console.log(" cancel step 9")
        end = endElement;

        for (let i = 0; i <= lastStrong; i++) {
            let tag = this.foundationTags[i];
            let [startIndex, endIndex] = this._findLimits(tag, start, end);
            console.log(tag, start, end)
            const middleClone = (tag.dataset.conception === this.tag.data.conception) ? new DocumentFragment() : tag.cloneNode(false);//========================
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
                
                
                if (!this._checkToRemove(endClone)) {
                    console.log(" cancel step 11.1.1")
                    end.after(endClone);
                }  
            }

            start = tag.nextSibling;
            
            if (this._checkToRemove(tag)) {
                console.log(" cancel step 12")
                tag.remove();
            }
        }

        this.range.setStart(start, 0);
        if (end instanceof HTMLElement) {
            console.log(" cancel step 14")
            this.range.setEnd(end, end.childNodes.length);
        } else if (end) {
            console.log(" cancel step 15")
            this.range.setEnd(end, end.data.length);
        }
        
        this._changeSelection();
    }
}