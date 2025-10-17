import collection from "./tagsCollection";
import Selected from "./Selected";
import TextExtractor from "./TextExtractor";

export default class Toggler extends TextExtractor  {

    multipleConceptions = ["FONTFAMILY", "FONTSIZE"];

    isFromRedactor = false;

    constructor() {

        super();
    
        this.isFromRedactor = !!this.redactor; 
        
    }

    checkSelectedOn(conception) {

        const condition = (tag) => tag.dataset.conception === conception;
                
        let isExist = false;   

        if (this.tags[conception].length || 
            this.foundationTags.find(condition) ||
            this.startTags.find(condition) ||
            this.endTags.find(condition)) {

                isExist = true;
        }
        return isExist;
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

    findDefaultValue(keyStyle) {
        if (this.blockElement) return this.blockElement.style[keyStyle];
        return null;
    }

    get state() {
        const result = {};

        result.isFromRedactor = this.isFromRedactor;

        for(let key in collection) {

            if (collection[key].data.type === "block") continue;

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
        return result;
    }
}