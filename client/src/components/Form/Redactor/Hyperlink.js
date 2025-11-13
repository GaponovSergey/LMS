import TextDecorator from "./TextDecorator";


export default class Hyperlink extends TextDecorator {

    constructor({href = null, range = null}) {
        super({
            tagName: "hyperlink",
                attributes: {
                    href
                },
                range
        })
    }

    cancelLink() {
        if(this.isCollapsed) {
            console.log("link 0")
            const link = this.foundationTags.find( tag => tag.dataset.conception === "HYPERLINK");
            const lastTextNode = this.findTextNode(link, true);

            if(lastTextNode === this.range.endContainer && this.range.endOffset === this.range.endContainer.length) {
                console.log("link 1")
                const node = document.createTextNode("");
                link.after(node);

                this.range.setStart(node, 0);
                this.range.setEnd(node, 0);
                
                return this.changeSelection();
            } else {
                link.replaceWith(...link.childNodes);
                link.remove();
            }
        } else {
            if(this.tags.HYPERLINK.length) {
                this.tags.HYPERLINK.forEach( tag => tag.replaceWith(...tag.childNodes));
            } else {
                const link = this.foundationTags.find( tag => tag.dataset.conception === "HYPERLINK");
                link.replaceWith(...link.childNodes);
            }
        }
        this.range.setStart(...this.startRange);
        this.range.setEnd(...this.endRange);
        this.changeSelection();
    }
}