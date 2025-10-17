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
            default: 
                return;
        }
    };

    
    
    verticalHandler( isTop = false) {

        const side = isTop ? "previousElementSibling" : "nextElementSibling";

        return (e) => {
        
            this.blockElement.style.display = "inline";
            const lines = this.blockElement.getClientRects();
            const controlLine = isTop ? lines[0].y : lines[lines.length - 1].y;
            const selectedLine = this.range.getBoundingClientRect().y;
            const isInControlLine = isTop ? controlLine >= selectedLine : controlLine <= selectedLine;
            console.log(this.blockElement.getClientRects())
            console.log(this.range.getBoundingClientRect())
            this.blockElement.style.display = "block";
            const sibling = this.blockElement[side];
            
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
            
            this.removeEmptyFoundationTags();
            const textNodes = document.createTreeWalker(this.blockElement, NodeFilter.SHOW_TEXT);
            
            if(this.blockElement[side]  && 
                ( isTop && textNodes.firstChild() === this.range.startContainer && !this.range.startOffset || 
                !isTop && textNodes.lastChild() === this.range.endContainer && this.range.endContainer.length === this.range.endOffset)
            ) {
                
                const textNode = this.findTextNode(this.blockElement[side], isTop);
                const offset = isTop ? textNode.length : 0;

                

                this.range.setStart(textNode, offset);
                this.range.setEnd(textNode, offset);

                this.changeSelection();
                e.preventDefault()
            }
        };
        
    };

    keyArrowDownHandler = this.verticalHandler();
    keyArrowUpHandler = this.verticalHandler(true);
    keyArrowLeftHandler = this.horisontalHandler(true);
    keyArrowRightHandler = this.horisontalHandler();

    keyEnterHandler(e) {
        
        switch(this.blockElement.dataset.conception) {
            case "HEADER2":
                this.headerEnterHandler(e);
                break;
            default: 
                return;
        }
    };

    headerEnterHandler (e) {

        e.preventDefault();
        
        this.extractContent();
        
        if (this.isCollapsed) {
            
            const textNode = document.createTextNode('');
            if (!this.range.endContainer.nextSibling) {
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