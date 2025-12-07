import TextExtractor from "./TextExtractor";
import collection from "../tagsCollection";


export default class Header extends TextExtractor  {

    tag = collection["header2"];

    constructor() {
        super();
    }

    setHeader() {

        const header = this.createElement();

        const blockElements = this.blockElements;
        
        if (blockElements.length) {
            blockElements[0].before(header);
            header.append(...blockElements[0].childNodes);
            blockElements[0].remove();

            for (let i = 1; i < blockElements.length; i++) {
                header.append(document.createElement("BR"), ...blockElements[i].childNodes);
                blockElements[i].remove();
            }

        } else {
            this.blockElement.before(header);
            header.append(...this.blockElement.childNodes);
            this.blockElement.remove();
        }

        this.range.setStart(...this.startRange);
        this.range.setEnd(...this.endRange);

        this.changeSelection();
        
        const p = this.createElement("paragraph");
        p.append(document.createTextNode(""));
        if (header.parentElement.lastElementChild === header) header.after(p);
    }

    setHeader1() {
        console.log(this.range)
        
        this.extractContent();
        
        let end = this.fragment.lastChild;
       
        let children = Array.from(this.fragment.childNodes);
        const header = this.createElement();
        const newFragment = new DocumentFragment();

        if (children.length) {
            if (children[0] instanceof HTMLElement && children[0].dataset.type === "block") {
                header.append(...children[0].childNodes);

                for (let i = 1; i < children.length; i++) {
                    header.append(document.createElement("BR"), ...children[i].childNodes);
                }
                
                
                const start = this.findTextNode(header)
                const end = this.findTextNode(header, true)
                this.range.setStart(start, 0);
                this.range.setEnd(end, end.length);
                
            } else {
                newFragment.append(this.fragment);
            }
        }


        if(this.startTags.length) {
            console.log("step 4.1")
            this.startTags[this.startTags.length - 1].after(newFragment.childNodes.length ? newFragment : header);
        }
        else {
            console.log("step 4.2")
            this.begin.after(newFragment.childNodes.length ? newFragment : header);
        }
        this.changeSelection()
        
        console.log("header")
        console.log(this.range)

        if (!this.foundationTags.length) return;

        let middleClone;
        
        for (let tag of this.foundationTags) {

            
            const children = Array.from(tag.childNodes);
            let [startIndex, endIndex] = this._findLimits(tag, this.start, end);
            middleClone = tag.cloneNode(false);
            console.log(" step 5")
            
            const forMiddleClone = children.slice(startIndex, ++endIndex);
            middleClone.append(...forMiddleClone);
            tag.after(middleClone);

            end = middleClone;
            this.start = middleClone;

            if (endIndex !== children.length ) {
                console.log("step 6")
                const endClone = tag.cloneNode(false);
                const forEndClone = children.slice(endIndex);
                endClone.append(...forEndClone);                
                
                if (!this.checkToRemove(endClone)) {
                    console.log(" step 7")
                    console.log(...endClone.childNodes)
                    end.after(endClone);
                }  
            }

            if (this.checkToRemove(tag)) {
                console.log(" step 8")
                tag.remove();
            }

        }

        const wrapper = this.createElement();
        wrapper.append(...middleClone.childNodes);
        middleClone.after(wrapper);
        middleClone.remove();
        
        console.log(" step 9.1")
        console.log(wrapper)
        this.start = this.findTextNode(wrapper);
        if (!this.start) {
            console.log(" step 9.1.1")
            const textNode = document.createTextNode("")
            wrapper.append(textNode);
            this.start = textNode;
        }
        this.range.setStart(this.start, 0);
        
        console.log(" header2 step 9.2")
        end = this.findTextNode(wrapper, true);
        console.log(end)
        let endOffset = end.length;
        console.log(wrapper.childNodes)
        this.range.setEnd(end, endOffset);
        this.changeSelection();

        const p = this.createElement("paragraph");
        p.append(document.createTextNode(""));
        if (this.redactor.lastElementChild === wrapper) wrapper.after(p);

    }

    
}