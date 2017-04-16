'use strict';

// constructor function for creating card objects
var BasicCard = function(front, back) {

    if (!(this instanceof BasicCard)) {
        return new BasicCard(front, back);
    }

    this.front = front;
    this.back = back;

};

BasicCard.prototype.showAnswer = function() {
    return this.back;
};

var ClozeCard = function(text, cloze) {

    if (!(this instanceof ClazeCard)) {
        return new ClozeCard(text, cloze);
    }

    this.text = text;    //full-text
    this.cloze = cloze;  //the cloze-deleted portion of the full-text

};

// returns the cloze-deleted portion of the text.
ClozeCard.prototype.showClozeDeletedPortion = function () {
    return this.cloze;
}
// returns the partial text.
ClozeCard.prototype.showPartialText = function () {

    this.partialText = (this.text).replace(this.cloze, "________");
    return this.partialText;
}

// returns the full text.
ClozeCard.prototype.showFullText = function () {
    return this.text;
}

// logs an error when the cloze/deleted portion is not detected.
ClozeCard.prototype.isClozeMsg = function () {
    if (this.text === this.partialText) {
        return "No cloze part was detected for the input statement"
    }
}

// exporting card constructors
module.exports = {
    BasicCard: BasicCard,
    ClozeCard: ClozeCard
};