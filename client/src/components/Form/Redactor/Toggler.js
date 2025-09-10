import collection from "./tagsCollection";

export default class Toggler {

    constructor(selected) {
        this.tags = selected.tags;
        this.foundationTags = selected.foundationTags;
        this.startTags = selected.startTags;
        this.endTags = selected.endTags;
        
    }

    _checkSelectedOn(conception) {

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

    get state() {
        const result = {};

        for(let key in collection) {

            if (collection[key].data.type === "block") continue;

            result[key] = this._checkSelectedOn(collection[key].data.conception);
        }

        return result;
    }
}