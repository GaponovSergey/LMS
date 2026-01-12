import collection from "../tagsCollection";
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

    setMultipleValue({data, keyStyle}) {

        if (!this.isFromRedactor) return null;

        const {conception} = data;
        const inFoundation = this.foundationTags.find(tag => tag.dataset?.conception === conception);
        const tags = this.tags[conception];

        const unquot = (text) => {
            text = text.split('"');
            text = text.join("");
            return text;
        };

        let defaultValue;

        if (this.blockElement) defaultValue = unquot(this.blockElement.style[keyStyle]);
        else {

            const blockElements = this.blockElements;

            if(!blockElements.length) return null;

            const controlValue = unquot(blockElements[0].style[keyStyle]);
            const isDifferentValue = blockElements.find( element => unquot(element.style[keyStyle]) !== controlValue);
            defaultValue = isDifferentValue ? null : controlValue;
        }

        if(inFoundation) {
            
            if (!tags.length) return unquot(inFoundation.style[keyStyle]);
            if (tags.find(tag => tag.style[keyStyle] !== inFoundation.style[keyStyle])) return null;
            else return unquot(inFoundation.style[keyStyle]);
        } else {
            if(tags.length) {
                if (defaultValue === null || tags.find( tag => unquot(tag.style[keyStyle]) !== defaultValue)) {
                    return null;
                } else {
                    return defaultValue;
                }
            } else {
                return defaultValue;
            }
        }
    }

    checkOnMultiblocks() {
        for (let key of this.multiblocks) {
            if(this.tags[key].length) return true;
        }
        return false;
    }

    findDefaultValue(keyStyle) {
        const unquot = (text) => {
            text = text.split('"');
            text = text.join("");
            return text;
        };
        if (this.blockElement) return unquot(this.blockElement.style[keyStyle]);
        return null;
    }

    defineTextAlign() {

        if (!this.isFromRedactor) return null;

        if (this.blockElement) return this.blockElement.style.textAlign;

        const blockElements = this.blockElements;

        if(!blockElements.length) return null;

        const textAlign = blockElements[0].style.textAlign;

        console.log("textAlign")
        console.log(textAlign)

        const isDifferentValue = blockElements.find( element =>  element.style.textAlign !== textAlign);
        return isDifferentValue ? null : textAlign;
    }

    get state() {
        const result = {};

        result.isFromRedactor = this.isFromRedactor;
        result.blockElement = this.blockElement ? this.blockElement.dataset.conception : null;
        result.isMultiblockSelected = this.checkOnMultiblocks();
        result.range = this.range;
        result.textAlign = this.defineTextAlign();

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