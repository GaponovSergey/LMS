export default class Selected  {

        startTags = [];
        endTags = [];
        foundationTags = [];
        tags = {
                BOLD: [],
                ITALIC: [],
                UNDERLINE: [],
                PARAGRAPH: []
            };
        lastIndex = {};

        foundation = null;
        range = null;
        selection = null;
        isCollapsed = false;
        redactor = null;

        constructor(){
            this.selection = document.getSelection();

            if (!this.selection.anchorNode) return;

            this.range = this.setUncollapsedRange(this.selection);
            this.foundation = this.range.commonAncestorContainer;

            if (this.foundation?.id === "redactor") {
                this.redactor = this.foundation;
            } else {
                this.redactor = this.selection.anchorNode ? this.selection.anchorNode.parentElement.closest("#redactor") : null;
            }

            if ( this.redactor) {
                
                if (this.selection.toString().length) {

                    if (this.range.startContainer instanceof HTMLElement) {
                        const start = this.findTextNode(this.range.startContainer.childNodes[this.range.startOffset]);
                        this.range.setStart(start, 0)
                    }

                    if (this.range.endContainer instanceof HTMLElement) {
                        const end = this.findTextNode(this.range.endContainer.childNodes[this.range.endOffset - 1], true);
                        this.range.setEnd(end, end.length)
                    }
                    if (!this.range.endOffset) {
                        let end = this.range.endContainer.parentElement;
                        while (end !== this.foundation) {
                            if (end.previousSibling) {
                                end = this.findTextNode(end.previousSibling, true);
                                break;
                            }
                        }
                        this.range.setEnd(end, end.length)
                    }
console.log(this.range)
                    this._setSelectedTags();
                    this._setFoundationTags();
                    console.log(this)
                } else { 
                    this.isCollapsed = true;
                    this._setFoundationTags();
                }
            }
        }

        findTextNode (node,  isEnd = false) {
            
            while (node instanceof HTMLElement) {
                node = isEnd ? node.lastChild : node.firstChild;
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
            console.log("hjk")
            console.log(endNode)
            for(let element of elements) {
                console.log(element)
                if (element === endNode) break;
                if (element === startNode) {
                    isBegin = true;
                    continue;
                }
                
                if (!isBegin) continue;
                
                if (!(element instanceof HTMLElement) || element.tagName === "BR") continue;
                let tags = element.querySelectorAll("*");
                for(let tag of tags) {
                    this.tags[tag.dataset.conception].push(tag); 
                }
                this.tags[element.dataset.conception].push(element); 
                console.log(element)
            }
        }

        _setFoundationTags() {
            
            let node = this.foundation instanceof HTMLElement ? this.foundation : this.foundation.parentElement;

            while(node !== this.redactor) {
                this.foundationTags.push(node);
                node = node.parentElement;
            }
        }

        _addParents(node, course = "right") {

            const sibling = ( course === "right" ) ? "nextElementSibling" : "previousElementSibling";
            const tags = ( course === "right" ) ? "startTags" : "endTags";
            const side = ( course === "right" ) ? "start" : "end";
            let child = node;

            while (node !== this.foundation) {
                
                if (node[sibling] && node.parentElement !== this.foundation) {
                    this._addSiblings(node[sibling], course);
                }
                if (node instanceof HTMLElement) {
                    this[tags].push(node);
                    this.tags[node.dataset.conception].push(node);
                    this.lastIndex[node.dataset.conception] = this.lastIndex[node.tagName] || { start: null, end: null};
                    this.lastIndex[node.dataset.conception][side] = this[tags].length - 1;
                }
                child = node;
                node = node.parentElement;
            }

            return child;
        }

        _addSiblings(node, course = "right") {
            const sibling = ( course === "right" ) ? "nextElementSibling" : "previousElementSibling";
            console.log("add " + node)
            while (node) {
                console.log(node)
                if (node instanceof HTMLElement && node.tagName !== "BR") this.tags[node.dataset.conception].push(node);
                if (node.children.length) {
                    this._addSiblings(node.firstElementChild);
                }
                node = node[sibling];
            } 
        }
    }