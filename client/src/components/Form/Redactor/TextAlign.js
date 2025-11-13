import Selected from "./Selected";

export default class TextAlign extends Selected {

    constructor() {
        super();
    }

    setAlign(align) {
        console.log("setalign")
        const blockElements = this.blockElement ? [this.blockElement] : this.blockElements;

        for (const element of blockElements) {
            element.style.textAlign = align;
        }
        this.redactor.focus();
    }
}