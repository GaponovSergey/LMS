import Selected from "./Selected";
import TextExtractor from "./TextExtractor";

export default class TextAlign extends TextExtractor {

    constructor() {
        super();
    }

    setAlign(align) {
        console.log("setalign")
        const blockElements = this.blockElement ? [this.blockElement] : this.blockElements;

        for (const element of blockElements) {
            element.style.textAlign = align;
        }

        this.changeSelection();
        this.redactor.focus();
    }
}