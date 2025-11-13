import TextExtractor from "./TextExtractor";


export default class Handler extends TextExtractor {

    constructor() {
        super();
    }

    keyHandler(e) {
        switch(e.code) {
            case "Enter":
                this.keyEnterHandler(e);
                break;
            case "ArrowDown":
                this.keyArrowDownHandler(e);
                break;
            case "ArrowUp":
                this.keyArrowUpHandler(e);
                break;
            case "ArrowLeft":
                this.keyArrowLeftHandler(e);
                break;
            case "ArrowRight":
                this.keyArrowRightHandler(e);
                break;
            case "Backspace":
                this.keyBackspaceHandler(e);
                break;
            case "Delete":
                this.keyBackspaceHandler(e);
                break;
            case "Space":
                this.linkAutoCreator(e);
                this.defaultHandler(e);
                break;
            default: 
                this.defaultHandler(e);
        }
    };

    defaultHandler(e) {
                    const keys = ["Comma", "Period", "Slash", "Backquote", 
                        "Semicolon", "Quote", "BracketLeft", "BracketRight",
                        "Backslash", "Minus", "Equal", "Space"];
                        console.log("this.foundationTags")
                        console.log(this.foundationTags)
                    if( this.isCollapsed && this.range.endContainer.nodeName === "#text" && 
                        this.foundationTags.find(element => element.dataset.type === "inline") &&
                        (e.code.match(/Key|Numpad/) || keys.includes(e.code))) {

                        e.preventDefault()
                        console.log("defaultHandler")
                        console.log(this.startRange[0], this.endRange[0])
                        this.range.endContainer.data += e.key;
                        this.range.setStart(this.startRange[0], this.startRange[1] + 1);
                        this.range.setEnd(this.endRange[0], this.endRange[1] + 1);

                        this.changeSelection()
                    }
                }

    keyBackspaceHandler(e) {

        console.log("backspace -1")
        console.log(this.multiblockElement)

        if (this.multiblockElement) {
        
            switch(this.multiblockElement.dataset.conception){
                case "LI":
                    this.backspaceLiHandler(e);
                    break;
                case "OL":
                case "UL":
                    this.backspaceListHandler(e);
                    break;
                default:
                    return;
            }
        }
        return;
    }

    backspaceListHandler(e){

        const list = this.multiblockElement;

        console.log("backspace list 0")

        this.extractContent();

        if (this.checkToRemove(list)) {

            console.log("backspace list 1")

            const side = list.previousElementSibling ? "previousElementSibling" : "nextElementSibling";
            let sibling = list[side];
            list.remove();

            if (!sibling) {

                console.log("backspace list 2")

                const p = this.createElement("P");
                const textNode = document.createTextNode("");
                p.append(textNode);
                this.redactor.append(p);
                this.begin = textNode;

                this.range.setStart(this.begin, this.begin.length ? this.begin.length - 1 : 0);
                this.range.setEnd(this.begin, this.begin.length);

                   
            } else {

                console.log("backspace list 3")

                let isEnd = (side === "previousElementSibling");
                this.begin = this.findTextNode(sibling, isEnd);
                const offset = isEnd ? this.begin.length : 0;

                this.range.setStart(this.begin, offset ? offset - 1 : 0);
                this.range.setEnd(this.begin, offset);
            }

        } else {

            console.log("backspace list 4")

            this.range.setStart(this.begin, this.begin.length ? this.begin.length : 0);
            this.range.setEnd(this.begin, this.begin.length);
        }

        e.preventDefault();

        return this.changeSelection();
    }

    findFirstText(node) {
        const textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        let firstNode;
        let isFirstChild = false;
        let firstChild = null;
        
        while (textNodes.nextNode()) {
            if(!isFirstChild) {
                isFirstChild = true;
                firstChild = textNodes.currentNode;
            }
            if(textNodes.currentNode.data !== "") {
                firstNode = textNodes.currentNode;
                break;
            }
        }

        firstNode = firstNode ? firstNode : firstChild;

        return firstNode;
    }

    findLastText(node) {
        const textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        let lastNode;
        
        while (textNodes.nextNode()) {
            if(textNodes.currentNode.data !== "") {
                lastNode = textNodes.currentNode;
                
            }
        }

        lastNode = lastNode ? lastNode : textNodes.lastChild();

        return lastNode;
    }

    linkAutoCreator(e) {
        if (!this.isCollapsed) return;

        if (this.foundationTags.find(tag => tag.dataset.conception === "HYPERLINK")) return;

        const httpRegExp = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/);
        const match = this.range.startContainer.data.match(httpRegExp);

        if (!match) return;

        const range = new Range();
        range.setStart(this.range.startContainer, match.index);
        range.setEnd(this.range.startContainer, match.index + match[0].length);

        const hyperlink = this.createElement("hyperlink");
        hyperlink.href = match[0];

        range.surroundContents(hyperlink);

        this.range.setStartAfter(hyperlink)
        this.range.setEndAfter(hyperlink)

        this.changeSelection()

        return;

    }

    backspaceLiHandler(e) {

        console.log("backspace 0")

        if (!this.isCollapsed) return;

        if (this.range.startOffset !== 0) return;

        const li = this.multiblockElement;
        let firstNode = this.findTextNode(li);

        console.log("backspace 1")
        console.log(this.blockElement?.childNodes)

        if ( this.range.startContainer !== firstNode) {

            if (li.lastElementChild !== this.blockElement) return;

            firstNode = this.findFirstText(this.blockElement);

            if (this.range.startContainer !== firstNode) return;

            const parentLi = li.parentElement.parentElement; 

            if (parentLi === this.redactor) {

                if(li.parentElement.lastElementChild !== li) return;

                li.parentElement.after(this.blockElement);

                if (!li.children.length) li.remove();

            } else { 

                if (parentLi.dataset.conception !== "LI") return;

                const newLi = this.createElement("li");
                newLi.append(this.blockElement);
                parentLi.after(newLi);
            } 
        } else {

            console.log("backspace 2")

            const sibling = li.previousElementSibling;

            if (this.blockElement !== li.lastElementChild) return;

            if (!sibling) {
                console.log("backspace 3")
                const list = li.parentElement;
                list.before(...li.children);
                li.remove();
                if (!list.children.length) list.remove();
            } else {
                console.log("backspace 4")
                sibling.append(...li.children);
                li.remove();
            }
        }

        e.preventDefault()

        this.range.setStart(...this.startRange);
        this.range.setEnd(...this.endRange);

        this.changeSelection();

    }
    
    verticalHandler( isTop = false) {

        const side = isTop ? "previousElementSibling" : "nextElementSibling";

        return (e) => {
            
            if (!this.blockElement) return;

            this.blockElement.style.display = "inline";
            const lines = this.blockElement.getClientRects();
            const controlLine = isTop ? lines[0].y : lines[lines.length - 1].y;
            const selectedLine = this.range.getBoundingClientRect().y;
            const isInControlLine = isTop ? controlLine >= selectedLine : controlLine <= selectedLine;
            console.log(this.blockElement.getClientRects())
            console.log(this.range.getBoundingClientRect())
            this.blockElement.style.display = "block";
            const sibling = this.findBlockSibling(isTop);
            
            if (isInControlLine && sibling) {
                const textNode = this.findTextNode(sibling, isTop);

                this.range.setStart(textNode, isTop ? textNode.length : 0);
                this.range.setEnd(textNode, isTop ? textNode.length : 0);

                this.changeSelection();
                e.preventDefault();

            }
        };
        
    };

    removeEmptyFoundationTags() {
        console.log("remove")
        console.log(this.foundationTags)
        for (let tag of this.foundationTags) {
            if (tag.dataset.type === "block") break;
            if (this.checkToRemove(tag)) tag.remove();
        }
    }

    horisontalHandler( isTop = false) {

        const side = isTop ? "previousElementSibling" : "nextElementSibling";

        return (e) => {
            
            if (!this.blockElement) return;

            this.removeEmptyFoundationTags();
            const textNodes = document.createTreeWalker(this.blockElement, NodeFilter.SHOW_TEXT);
            
            if( isTop && textNodes.firstChild() === this.range.startContainer && !this.range.startOffset || 
                !isTop && textNodes.lastChild() === this.range.endContainer && this.range.endContainer.length === this.range.endOffset
            ) {

                const sibling = this.findBlockSibling(isTop);

                if (!sibling) return;
                
                const textNode = this.findTextNode(sibling, isTop);
                const offset = isTop ? textNode.length : 0;

                this.range.setStart(textNode, offset);
                this.range.setEnd(textNode, offset);

                this.changeSelection();
                e.preventDefault()
            }
        };
        
    };

    findBlockSibling(isTop = false, blockElement = this.blockElement) {

        const blockElements = Array.from(this.redactor.querySelectorAll(`*[data-type="block"]`));
        let blockIndex = blockElements.indexOf(blockElement);

        if (!isTop && blockIndex === blockElements.length - 1 || isTop && !blockIndex) return null;

        const sibling = blockElements[isTop ? --blockIndex : ++blockIndex];

        return sibling;
    }

    keyArrowDownHandler = this.verticalHandler();
    keyArrowUpHandler = this.verticalHandler(true);
    keyArrowLeftHandler = this.horisontalHandler(true);
    keyArrowRightHandler = this.horisontalHandler();

    keyEnterHandler(e) {

        this.linkAutoCreator(e);


        if (this.multiblockElement) {
            switch(this.multiblockElement.dataset.conception){
                case "LI":
                    this.liEnterHandler(e);
                    break;
                case "OL":
                case "UL":
                    this.backspaceListHandler(e);
                    break;
                default:
                    return;
            }

        } else if (this.blockElement){

            
            switch(this.blockElement.dataset.conception) {
                case "HEADER2":
                    this.headerEnterHandler(e);
                    break;
                default: 
                    (e => {
                        if (this.isCollapsed) {
                            e.preventDefault();

        const lastTextNode = this.findTextNode(this.blockElement, true);
        this.range.setEnd(lastTextNode, lastTextNode.length);
        this.extractContent();
        const newBlock = this.blockElement.cloneNode();
        newBlock.append(this.fragment);
        this.blockElement.after(newBlock);

        let textNode = this.findTextNode(newBlock);
        console.log(textNode)

        this.range.setStart(textNode, 0);
        this.range.setEnd(textNode, 0);

        

        this.changeSelection()
                        }
                    })(e)
            }
        }
        return;
        
    };

    liEnterHandler(e) {
        console.log("enter li 0")
        if (!this.isCollapsed) return;
        
        console.log("enter li 1")

        const li = this.multiblockElement;

        if (li.lastChild !== this.blockElement) return;

        e.preventDefault();

        const lastTextNode = this.findTextNode(this.blockElement, true);
        this.range.setEnd(lastTextNode, lastTextNode.length);
        this.extractContent();
        const newLi = this.createElement("li");
        const newBlock = this.createElement("paragraph");
        newLi.append(newBlock);
        newBlock.append(this.fragment);
        li.after(newLi);

        let textNode = this.findTextNode(newBlock);
        console.log(textNode)

        this.range.setStart(textNode, 0);
        this.range.setEnd(textNode, 0);

        

        this.changeSelection()
        console.log(this.selection)
        
        
    }

    headerEnterHandler(e) {

        e.preventDefault();
        
        this.extractContent();

        let textNode;
        
        if (this.isCollapsed) {
            
            textNode = document.createTextNode("");
            console.log("this.range.endContainer.nextSibling")
            console.log(this.range.endContainer.nextSibling)
            if (!this.range.endContainer.nextSibling || !this.range.endContainer.nextSibling.data ) {
                this.range.endContainer.after(document.createElement("br"), textNode, document.createElement("br"));
            } else {
                this.range.endContainer.after(document.createElement("br"), textNode);
            }
            
            
            this.range.setEnd(textNode, 0);
            this.range.setStart(textNode, 0);
                            
            
        } else {
            const br = document.createElement("br");
            const textNode = document.createTextNode('');
            this.begin.after(br, textNode);
            this.range.setEnd(textNode, 0);
            this.range.setStart(textNode, 0);
        }

        this.changeSelection();

        
        
    }
 
}