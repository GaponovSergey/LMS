export default class Selected  {

        startTags = [];
        endTags = [];
        foundationTags = [];

        get blockElements() {
            const {start, end} = this._blockElements;
            const reversedEnd = end.reverse();
            return[...start, ...reversedEnd];
        }

        _blockElements = {
            start: [],
            end: []
        };

        tags = {
                BOLD: [],
                ITALIC: [],
                UNDERLINE: [],
                PARAGRAPH: [],
                HEADER2: [],
                TEXTCOLOR: [],
                STRINGCOLOR: [],
                FONTFAMILY: [],
                FONTSIZE: [],
                UL: [],
                OL: [],
                LI: []
            };

        foundation = null;
        range = null;
        selection = null;
        isCollapsed = false;
        redactor = null;
        blockElement = null;
        multiblockElement = null;

        constructor(range = null) {
            this.selection = document.getSelection();
            console.log("select 1")
            if (!this.selection.anchorNode) return;

            this.range = range ? range : this.setUncollapsedRange(this.selection);
            this.startRange = [this.range.startContainer, this.range.startOffset];
            this.endRange = [this.range.endContainer, this.range.endOffset];
            this.foundation = this.range.commonAncestorContainer;

            if (this.foundation?.id === "redactor") {
                console.log("select 2")
                this.redactor = this.foundation;
            } else {
                console.log("select 3")
                this.redactor = this.range.startContainer ? this.range.startContainer.parentElement.closest("#redactor") : null;
            }

            if ( this.redactor) {
                console.log("select 4")
                if (this.range.toString().length) {
                    console.log("select 5")
                    console.log(this.range)
                    if (this.range.startContainer instanceof HTMLElement) {
                        console.log("select 6")
                        const start = this.findTextNode(this.range.startContainer.childNodes[this.range.startOffset]);
                        this.range.setStart(start, 0)
                    }

                    if (this.range.endContainer instanceof HTMLElement) {
                        console.log("select 7")
                        const end = this.findTextNode(this.range.endContainer.childNodes[this.range.endOffset ? this.range.endOffset - 1 : 0], true);
                        this.range.setEnd(end, end.length)
                    }
                    if (this.range.startContainer.length === this.range.startOffset ) {
                        console.log("select 8")
                        let start = this.range.startContainer;

                        start = this.findSibling(start);
                        start = this.findTextNode(start);

                        this.range.setStart(start, 0)
                    }
                    if (!this.range.endOffset ) {
                        console.log("select 9")
                        let end = this.range.endContainer;

                        end = this.findSibling(end, true);
                        end = this.findTextNode(end, true);

                        this.range.setEnd(end, end.length)
                    }
                    console.log(this.range)
                    this._setSelectedTags();
                    this._setFoundationTags();
                    
                    console.log(this)
                } else { 
                    console.log("select 10")
                    console.log(this.range.startContainer )
                    this.isCollapsed = true;
                    if (this.range.startContainer instanceof HTMLElement) {
                        console.log("select 11")
                        const node = this.findTextNode(this.range.startContainer.childNodes[this.range.startOffset]);
                        if (node) {
                            console.log("select 12")
                            this.range.setStart(node, 0);

                            this.range.setEnd(node, node.length ? 1 : 0);
                        } 
                        

                    }
                    

                    this._setFoundationTags();
                    
                }
            }
        }

        

        findSibling(node, isEnd = false) {
            const sibling = isEnd ? "previousSibling" : "nextSibling";
            while (node !== this.foundation) {
                if (node[sibling]) {
                    node = node[sibling];
                    break;
                }
                node = node.parentElement;
            }
            return node;
        }

        findTextNode (node,  isEnd = false) {
            while (node instanceof HTMLElement) {
                let child = isEnd ? node.lastChild : node.firstChild;
                if(!child) break;
                node = child;
            }

            return node;
        }

        setUncollapsedRange(selection) {
            const range = new Range();
            range.setStart(selection.anchorNode, selection.anchorOffset);
            range.setEnd(selection.focusNode, selection.focusOffset);

            if (range.collapsed) {
                range.setEnd(selection.anchorNode, selection.anchorOffset);
                range.setStart(selection.focusNode, selection.focusOffset);
            }
            return range;
        }

        _setSelectedTags() {

            let startNode = this._addParents(this.range.startContainer, "right");
            let endNode = this._addParents(this.range.endContainer, "left");

            let isBegin = false;
            let elements = this.foundation.childNodes || [];
            
            for(let element of elements) {
                console.log(element)
                if (element === endNode) break;
                if (element === startNode) {
                    isBegin = true;
                    continue;
                }
                
                if (!isBegin) continue;
                
                if (!(element instanceof HTMLElement) || element.tagName === "BR") continue;

                if (element instanceof HTMLElement && element.dataset.type === "block") this._blockElements.start.push(element);

                let tags = element.querySelectorAll("*");
                for(let tag of tags) {
                    if (tag.tagName === "BR") continue;
                    this.tags[tag.dataset.conception].push(tag); 
                    if (tag instanceof HTMLElement && tag.dataset.type === "block") this._blockElements.start.push(tag);
                }
                this.tags[element.dataset.conception].push(element); 
                console.log(element)
            }
        }

        _setFoundationTags() {
            
            let node = this.foundation instanceof HTMLElement ? this.foundation : this.foundation.parentElement;
            let isBlockFinded = false;
            let isMultiblockFinded = false;
            while(node !== this.redactor) {
                this.foundationTags.push(node);

                if (!isBlockFinded && node.dataset.type === "block") {
                    isBlockFinded = true;
                    this.blockElement = node;
                }
                if (!isMultiblockFinded && node.dataset.type === "multiblock") {
                    isMultiblockFinded = true;
                    this.multiblockElement = node;
                }
                node = node.parentElement;
            }
        }

        _addParents(node, course = "right") {

            const sibling = ( course === "right" ) ? "nextElementSibling" : "previousElementSibling";
            const tags = ( course === "right" ) ? "startTags" : "endTags";
            const side = ( course === "right" ) ? "start" : "end";
            let child = node;

            while (node !== this.foundation) {
                
                
                if (node instanceof HTMLElement && node.tagName !== "BR") {
                    
                    this[tags].push(node);
                    this.tags[node.dataset.conception].push(node);
                    
                    if (node.dataset.type === "block") this._blockElements[side].push(node);
                }
                if (node[sibling] && node.parentElement !== this.foundation) {
                    this._addSiblings(node[sibling], course);
                }
                child = node;
                node = node.parentElement;
            }

            return child;
        }

        _addSiblings(node, course = "right") {

            const sibling = ( course === "right" ) ? "nextElementSibling" : "previousElementSibling";
            const side = ( course === "right" ) ? "start" : "end";
            
            console.log("add " + node)
            while (node) {
                console.log(node)
                if (node.tagName !== "BR") this.tags[node.dataset.conception].push(node);
                if (node.dataset.type === "block") this._blockElements[side].push(node);
                if (node.children.length) {
                    this._addSiblings(node.firstElementChild);
                }
                node = node[sibling];
            } 
        }
    }