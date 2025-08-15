export default class Selected  {

        startTags = [];
        endTags = [];
        foundationTags = [];
        tags = {
                STRONG: [],
                P: [],
                I: []
            };
        lastIndex = {};

        foundation = null;
        range = null;
        selection = null;

        constructor(){
            this.selection = document.getSelection();
            if (this.selection.toString().length && this.selection.anchorNode.parentElement.closest("#redactor")) {
                this.range = this.setUncollapsedRange(this.selection);
                this._setSelectedTags(this.range);
            }
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
            this.foundation = this.range.commonAncestorContainer;
            const redactor = document.getElementById("redactor");

            let startNode = this._addParents(this.range.startContainer, "right");
            let endNode = this._addParents(this.range.endContainer, "left");

            let isBegin = false;
            let elements = this.foundation.children || [];

            for(let element of elements) {
                if (element === startNode) {
                    isBegin = true;
                    continue;
                }
                if (!isBegin) continue;
                if (element === endNode) break;
                let tags = element.querySelectorAll("*");
                for(let tag of tags) {
                    this.tags[tag.tagName].push(tag); 
                }
                this.tags[element.tagName].push(element); 
            }

            let node = this.foundation instanceof HTMLElement ? this.foundation : this.foundation.parentElement;
            while(node !== redactor) {
                this.foundationTags.push(node);
                node = node.parentElement;
            }

        }

        _addParents(node, course = "right") {

            const sibling = ( course === "right" ) ? "nextElementSibling" : "previousElementSibling";
            const tags = ( course === "right" ) ? "startTags" : "endTags";
            const side = ( course === "right" ) ? "start" : "end";
            let child = null;

            while (node !== this.foundation) {
                
                if (node[sibling] && node.parentElement !== this.foundation) {
                    this._addSiblings(node[sibling], course);
                }
                if (node instanceof HTMLElement) {
                    this[tags].push(node);
                    this.tags[node.tagName].push(node);
                    this.lastIndex[node.tagName] = this.lastIndex[node.tagName] || { start: null, end: null};
                    this.lastIndex[node.tagName][side] = this[tags].length - 1;
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
                node.tagName && this.tags[node.tagName].push(node);
                if (node.children.length) {
                    this._addSiblings(node.firstElementChild);
                }
                node = node[sibling];
            } 
        }
    }