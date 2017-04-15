'use strict';

// constructor function for creating card objects
var BasicCard = function(front, back) {
    this.front = front;
    this.back = back;
};

BasicCard.prototype.showAnswer = function() {
    console.log('Answer: ' + this.back);
};

var ClozeCard = function(text, cloze) {
    this.text = text;    //full-text
    this.cloze = cloze;  //the cloze-deleted portion of the full-text
};

// returns the cloze-deleted portion of the text.
ClozeCard.prototype.showClozeDeletedPortion = function () {
    return this.cloze;
}
// returns the partial text.
ClozeCard.prototype.showPartialText = function () {

    this.partialText = (this.text).replace(this.cloze, "______");
    return this.partialText;
}

// returns the full text.
ClozeCard.prototype.showClozeFullText = function () {
    return this.text;
}

// logs an error when the cloze deletion does not appear in the input text.
ClozeCard.prototype.showClozeErrorMsg = function () {
    if (this.text === this.partialText) {
        console.log('The cloze deletion did not appear in the input text');
    }
}

// exporting card constructors
module.exports = {
    BasicCard: BasicCard,
    ClozeCard: ClozeCard
};