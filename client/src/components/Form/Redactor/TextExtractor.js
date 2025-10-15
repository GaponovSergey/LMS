import Selected from "./Selected";


export default class TextExtractor extends Selected {

    isBegin = false;
    isEnd = false;
    fragment = null;
    start = null;
    end = null;
    endElement = null;
    begin = null;


    constructor() {

        super();

        if (this.isCollapsed && 
            this.range.startContainer instanceof HTMLElement && 
            this.range.startContainer.childNodes.length >= this.range.startOffset) {
                console.log(" extractor step 0")
                const textNode = document.createTextNode("");
                if (this.range.startOffset > 0 ) {
                    console.log(" extractor step 0.1")
                    this.range.startContainer.childNodes[this.range.startOffset - 1].after(textNode);
                    
                } else {
                    console.log(" extractor step 0.2")
                    this.range.startContainer.prepend(textNode);

                }
                this.range.setStart(textNode, 0);
                this.range.setEnd(textNode, 0);
        }

        this.begin = this.range.startContainer;
    }

    extractContent() {
        if (this.range.startContainer === this.range.endContainer && this.range.startContainer.nodeName === "#text") {
            console.log(" extractor step 1")
            this._separateSelected();           
        }

        /* if (this.range.startContainer === this.range.endContainer && 
            this.range.startOffset !== 0 && 
            this.range.endOffset !== this.range.endContainer.data.length) {
            console.log(" cancel step 1")
            this._separateSelected();
        }*/
                
        this.isBegin = this._defineSeparation();
        this.isEnd = this._defineSeparation(true); 

        this.fragment = this.range.extractContents();
        if (this.isCollapsed) this.fragment.append(document.createTextNode(""));

        this.start = this.fragment.firstChild;
        this.endElement = this.fragment.lastChild;
        this.end = this.findTextNode(this.endElement, true);

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

    _separateSelected() {
            const start = this.range.startContainer;
            const textParts = this.splitString(start.data, [0, this.range.startOffset, this.range.endOffset, start.data.length]);
            start.data = textParts[0];
            const middleNode = document.createTextNode(textParts[1]);
            const endNode = textParts[2] ? document.createTextNode(textParts[2]) : null;
            start.after(middleNode);
            if (endNode) middleNode.after(endNode);
            this.range.setStart(middleNode, 0);
            this.range.setEnd(middleNode, middleNode.length);
    }

    changeSelection() {
        this.selection.removeAllRanges();
        this.selection.addRange(this.range);
    }
}