import TextDecorator from "./TextDecorator";


export default class Header extends TextDecorator  {

    
    constructor() {
        super("header2");
    }

    setHeader() {
        console.log(this.range)
        
        this.extractContent();
        
        let end = this.fragment.lastChild;
       
        let children = Array.from(this.fragment.childNodes);
        let newFragment = new DocumentFragment();
            
        for(let element of children) {
                
            if (element instanceof HTMLElement && element.dataset.type === "block") {

                console.log("step 2")

                const wrapper = this.createElement();
                wrapper.append(...element.childNodes);
                newFragment.append(wrapper)
            } else {
                console.log("step 3")
                newFragment.append(element)
            }
        }

        if(this.startTags.length) {
            console.log("step 4.1")
            this.startTags[this.startTags.length - 1].after(newFragment);
        }
        else {
            console.log("step 4.2")
            this.begin.after(newFragment);
        }

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
                
                if (!this._checkToRemove(endClone)) {
                    console.log(" step 7")
                    console.log(...endClone.childNodes)
                    end.after(endClone);
                }  
            }

            if (this._checkToRemove(tag)) {
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