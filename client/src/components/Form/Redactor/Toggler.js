import collection from "./tagsCollection";
import Selected from "./Selected";
import TextExtractor from "./TextExtractor";

export default class Toggler extends TextExtractor  {

    multipleConceptions = ["FONTFAMILY", "FONTSIZE"];
    multiblocks = [ "OL", "UL", "LI"];

    isFromRedactor = false;

    constructor() {

        super();
    
        this.isFromRedactor = !!this.redactor; 
        
    }

    checkSelectedOn(conception) {

        const condition = (tag) => tag.dataset.conception === conception;                
        
        if (this.tags[conception].length || this.foundationTags.find(condition)) {

            return true;
        }
        return false;
    }

    setMultipleValue({data, keyStyle, defaultValue}) {
        const {conception} = data;
        const inFoundation = this.foundationTags.find(tag => tag.dataset.conception === conception);
        const tags = this.tags[conception];

        if(inFoundation) {
            if (!tags.length) return inFoundation.style[keyStyle];
            if (tags.find(tag => tag.style[keyStyle] !== inFoundation.style[keyStyle])) return null;
            else return inFoundation.style[keyStyle];
        } else {
            if(tags.length) {
                if (tags.length > 1 && 
                    !tags.find( tag => tag.style[keyStyle] !== tags[0].style[keyStyle])) {
                        return tags[0].style[keyStyle];
                }
                if (tags.find(tag => tag.style[keyStyle] !== this.blockElement.style[keyStyle])) return null;
                else return this.blockElement?.style[keyStyle] || "default";
            } else return this.blockElement?.style[keyStyle] || "default";
        }
    }

    checkOnMultiblocks() {
        for (let key of this.multiblocks) {
            if(this.tags[key].length) return true;
        }
        return false;
    }

    findDefaultValue(keyStyle) {
        if (this.blockElement) return this.blockElement.style[keyStyle];
        return null;
    }

    get state() {
        const result = {};

        result.isFromRedactor = this.isFromRedactor;
        result.blockElement = this.blockElement ? this.blockElement.dataset.conception : null;
        result.isMultiblockSelected = this.checkOnMultiblocks();

        for(let key in collection) {

            

            if (this.multipleConceptions.includes(collection[key].data.conception)) {
                result[key] = {
                    value: this.setMultipleValue(collection[key]),
                    isSelected: this.checkSelectedOn(collection[key].data.conception),
                    defaultValue: this.findDefaultValue(collection[key].keyStyle)
                };
                continue;
            }

            result[key] = this.checkSelectedOn(collection[key].data.conception);
        }

        console.log("toggler")
        console.log(result)
        return result;
    }
}