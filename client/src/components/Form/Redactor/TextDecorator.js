import collection from "./tagsCollection";
import TextExtractor from "./TextExtractor";

export default class TextDecorator extends TextExtractor {

    tag = {};

    constructor({
                    tagName,
                    style = {},
                    range = null
                }) {

        super(range);
        this.tagName = tagName;
        this.tag = collection[tagName];
        this.tag.style = {...this.tag.style, ...style};
        this.params = { tagName, style, range};
    }

    mapToRanges(blockElements){
        return blockElements.map((element, i) =>{

        const range = new Range();
        const start = this.findTextNode(element);
        const end = this.findTextNode(element, true);
        console.log(start, end)
                        
        if (i === 0) {
            range.setStart(this.range.startContainer, this.range.startOffset);
        } else {
            range.setStart(start, 0);
        }

        if (i === (blockElements.length - 1)) {
            range.setEnd(this.range.endContainer, this.range.endOffset);
        } else {
            range.setEnd(end, end.length);
        }
        console.log(range.toString())
        return range;   
    });
    } 
    

    setDecorator() {
        console.log(this.range)

        const blockElements = this.blockElements;
        console.log("blockelems")
        console.log(this.blockElement)

        if (blockElements.length) {
            
        
            const ranges = this.mapToRanges(blockElements);
            console.log(ranges)
            for (let range of ranges) {

                const decorator = new TextDecorator({
                    tagName: this.params.tagName,
                    style: this.params.style,
                    range
                });

                range = decorator.setDecorator();
            }
            this.range.setStart(ranges[0].startContainer, ranges[0].startOffset);
            this.range.setEnd(ranges[ranges.length - 1].endContainer, ranges[ranges.length - 1].endOffset);
            console.log("final range")
            console.log(this.range)
            return this.changeSelection();
        }


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
            return this.changeSelection();
        }

        
        console.log("step 3")
        console.log(this.fragment.childNodes)
        const wrapper = this.createElement();
        wrapper.append(...this.fragment.childNodes);
        this.fragment.append(wrapper)
        
        
        
            if (this.startTags.length) {
                console.log("step 5")
                const beforeStart = this.startTags[this.startTags.length - 1];
                beforeStart.after(this.fragment);
                this.start = this.findTextNode(wrapper);
                if(this.checkToRemove(beforeStart)) {
                    console.log("step 5.1")
                    beforeStart.remove();
                }
            }
            else {
                console.log("step 6")
                this.begin.after(document.createTextNode(""), this.fragment, document.createTextNode(""));
                this.start = wrapper;
            }
        

        if (this.start) {
            console.log(" step 9.1")
            console.log(this.start)
            this.start = this.findTextNode(this.start);
            this.range.setStart(this.start, 0);
        }

        if (this.end) this.range.setEnd(this.end, this.end.length);
        this.changeSelection();
        return this.range;
    }

    clearDecorator() {
        console.log(this.range)

        const blockElements = this.blockElements;
        console.log("blockelems clear")
        console.log(blockElements)

        if (blockElements.length) {
            const ranges = this.mapToRanges(blockElements);
            console.log(ranges)
            for (let range of ranges) {

                const decorator = new TextDecorator({
                    tagName: this.params.tagName,
                    style: this.params.style,
                    range
                });

                decorator.clearDecorator();
            }
            this.range.setStart(ranges[0].startContainer, ranges[0].startOffset);
            this.range.setEnd(ranges[ranges.length - 1].endContainer, ranges[ranges.length - 1].endOffset);
            console.log("final range clear")
            console.log(this.range)
            return this.changeSelection();
        }

        

        this.extractContent();

        const elements = this.fragment.querySelectorAll(`*[data-conception="${this.tag.data.conception}"]`); 

        for (let element of elements) {
            console.log(" cancel step 2")
            element.replaceWith(...element.childNodes);
            element.remove();
        }

        
            if (this.startTags.length) {
                console.log(" cancel step 3")
                const beforeStart = this.startTags[this.startTags.length - 1];
            
                beforeStart.after(this.fragment);
                this.range.setStart(this.findTextNode(beforeStart.nextSibling), 0);
                if (this.checkToRemove(beforeStart)) {
                    console.log(" cancel step 3.1")
                    beforeStart.remove();
                }
                
            }
            else {
                console.log(" cancel step 4")
                this.begin.after(this.fragment);
                this.range.setStart(this.findTextNode(this.begin.nextSibling), 0);
                if(this.begin.data === "") {
                    this.begin.remove();
                }
            }
    
        console.log(" cancel step 7")
        
        for (let tag of this.startTags) {
            if (this.checkToRemove(tag)) {
                tag.remove();
            }
        }
        for (let tag of this.endTags) {
            if (this.checkToRemove(tag)) {
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
                
                if (!this.checkToRemove(endClone)) {
                    console.log(" cancel step 11.1.1")
                    console.log(...endClone.childNodes)
                    end.after(endClone);
                }  
            }

            this.start = tag.nextSibling;
            
            if (this.checkToRemove(tag)) {
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