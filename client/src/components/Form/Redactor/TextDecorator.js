import collection from "./tagsCollection";
import TextExtractor from "./TextExtractor";

export default class TextDecorator extends TextExtractor {

    tag = {};

    constructor(tagName, style = {}) {
        super();
        this.tagName = tagName;
        this.tag = collection[tagName];
        this.tag.style = {...this.tag.style, ...style}
    }

    createElement(tagName = this.tagName) {
        const tag = (tagName === this.tagName) ? this.tag : collection[tagName];
        const element = document.createElement(tag.tagName);

        for (let key in tag.data) {
            element.dataset[key] = tag.data[key];
        }

        for (let key in tag.style) {
            element.style[key] = tag.style[key];
        }

        return element;
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

        this.extractContent();

        if (this.isCollapsed) {
            console.log("step 0")
            const wrapper = this.createElement();
            
            this.range.surroundContents(wrapper);
            const textNode = document.createTextNode("")
            wrapper.append(textNode);
            console.log(wrapper)
            this.range.setStart(textNode, 0);
            this.range.setEnd(textNode, 0);
            return this.changeSelection(this.range);
        }

        if (this.foundation === this.redactor) {
            let children = Array.from(this.fragment.children);
            console.log("step 2")
            for(let element of children) {
                const wrapper = this.createElement();
                wrapper.append(...element.childNodes);
                element.append(wrapper);
            }
        } else {
            console.log("step 3")
            const wrapper = this.createElement();
            wrapper.append(...this.fragment.childNodes);
            this.fragment.append(wrapper)
        }
        
        if (this.foundation !== this.redactor || this.isBegin) {
            console.log("step 4")
            if (this.isBegin || this.startTags.length) {
                console.log("step 5")
                const beforeStart = this.startTags[this.startTags.length - 1] || this.begin.parentElement;
                beforeStart.after(this.fragment);
                this.start = beforeStart.nextSibling;
                if(this._checkToRemove(beforeStart)) {
                    console.log("step 5.1")
                    beforeStart.remove();
                }
            }
            else {
                console.log("step 6")
                this.begin.after(this.fragment);
                this.start = this.begin.nextSibling;
            }
        } else {
            console.log("step 7")
            let sibling = this._closestBlock(this.begin);
            let firstChild = this.start.firstChild; 
            sibling.append(...this.start.childNodes);
            this.start.remove();
            sibling.after(this.fragment);
            this.start = firstChild;
        }

        if (this.start) {
            console.log(" step 9.1")
            console.log(this.start)
            this.start = this.findTextNode(this.start);
            this.range.setStart(this.start, 0);
        }

        if (this.foundation === this.redactor && !this.isEnd) {
            console.log("step 10")
            console.log(this.end)
            let blockElement = this.end.parentElement.closest('*[data-type="block"]');
            if (blockElement.nextSibling) {
                blockElement.append(...blockElement.nextSibling.childNodes);
                blockElement.nextSibling.remove();
            }
        }
        
        if (this.end) this.range.setEnd(this.end, this.end.length);
        this.changeSelection();
    }

    clearDecorator() {
        console.log(this.range)

        this.extractContent();

        const elements = this.fragment.querySelectorAll(`*[data-conception="${this.tag.data.conception}"]`); 

        for (let element of elements) {
            console.log(" cancel step 2")
            element.replaceWith(...element.childNodes);
            element.remove();
        }

        if (this.foundation !== this.redactor || this.isBegin) {
            if (this.isBegin || this.startTags.length) {
                console.log(" cancel step 3")
                const beforeStart = this.startTags[this.startTags.length - 1];
            
                beforeStart.after(this.fragment);
                this.range.setStart(beforeStart.nextSibling, 0);
                if (this._checkToRemove(beforeStart)) {
                    console.log(" cancel step 3.1")
                    beforeStart.remove();
                }
                
            }
            else {
                console.log(" cancel step 4")
                this.begin.after(this.fragment);
                this.range.setStart(this.begin.nextSibling, 0);
                if(this.begin.data === "") {
                    this.begin.remove();
                }
            }
        } else {
            console.log(" cancel step 5")
            let sibling = this._closestBlock(this.begin);
            let offset = sibling.childNodes.length;
            sibling.append(...this.start.childNodes);
            this.start.remove();
            sibling.after(this.fragment);
            this.range.setStart(sibling, offset);
        }
    
        console.log(" cancel step 7")
        

        if (this.foundation === this.redactor && !this.isEnd) {
            console.log(" cancel step 8")
            let sibling = this.endElement.nextSibling;
            this.endElement.append(...sibling.childNodes);
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

        
        this.range.setEnd(this.end, this.end.data.length)
        this.changeSelection();
        const lastStrong = this.foundationTags.findLastIndex(tag => tag.dataset.conception === this.tag.data.conception); 
        
        if (!(lastStrong + 1)) return;
        console.log(" cancel step 9")
        let end = this.endElement;

        for (let i = 0; i <= lastStrong; i++) {

            let tag = this.foundationTags[i];

            if (!this.isCollapsed) {
                console.log(" cancel step 9.1")
                for(let child of tag.childNodes) {
                    if (child.nodeName === "#text" && child.data === "") {
                        child.remove();
                    }
                }
            }

            const children = Array.from(tag.childNodes);
            let [startIndex, endIndex] = this._findLimits(tag, this.start, end);
            const middleClone = (tag.dataset.conception === this.tag.data.conception) ? new DocumentFragment() : tag.cloneNode(false);
            console.log(" cancel step 10")
            
            const forMiddleClone = children.slice(startIndex, ++endIndex);
            middleClone.append(...forMiddleClone);
            tag.after(middleClone);

            end = (middleClone instanceof DocumentFragment) ? children[endIndex - 1] : middleClone;

            if (endIndex !== children.length ) {
                console.log(" cancel step 11")
                const endClone = tag.cloneNode(false);
                const forEndClone = children.slice(endIndex);
                endClone.append(...forEndClone);                
                
                if (!this._checkToRemove(endClone)) {
                    console.log(" cancel step 11.1.1")
                    console.log(...endClone.childNodes)
                    end.after(endClone);
                }  
            }

            this.start = tag.nextSibling;
            
            if (this._checkToRemove(tag)) {
                console.log(" cancel step 12")
                tag.remove();
            }
        }

        if (this.start) {
            console.log(" cancel step 13")
            this.start = this.findTextNode(this.start)
            this.range.setStart(this.start, 0);
        }
        if (end instanceof HTMLElement) {
            console.log(" cancel step 15")
            end = this.findTextNode(end, true);
        } 
          
        this.range.setEnd(end, end.data.length);
        this.changeSelection();
    }
}