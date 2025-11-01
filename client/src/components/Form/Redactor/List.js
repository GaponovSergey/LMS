import collection from "./tagsCollection";
import TextExtractor from "./TextExtractor";

export default class List extends TextExtractor {

    tag = null;
    
    constructor (listType = "ol", style = {}) {
        super();

        this.tag = collection[listType];

        this.tag.style = {
            ...this.tag.style, 
            ...style
        }

    }

    createLi() {
        return this.createElement("li");
    }

    createTypedList() {
        return this.createElement();
    }

    setList() {

        const typedList = this.createTypedList();

        const blockElements = this.blockElements.length ? this.blockElements : [this.blockElement]; 
        blockElements[0].before(typedList);

        for (let element of blockElements) {
            const li = this.createLi();
            li.append(element);
            typedList.append(li);
        }
        console.log(typedList.textContent)
        this.range.setStart(...this.startRange);
        this.range.setEnd(...this.endRange);

        this.changeSelection();
        
        const p = this.createElement("paragraph");
        p.append(document.createTextNode(""));
        if (this.redactor.lastElementChild === typedList) typedList.after(p);

    }

}

