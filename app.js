var inquirer = require('inquirer');
var Cards = require('./cards.js');
var fs = require("fs");

var basicCardArr = [];
var clozeCardArr = [];

var basicCardFileArr = [];
var clozeCardFileArr = [];


Array.prototype.shuffle = function() {
    var i = this.length, j, temp;
    if ( i == 0 ) return this;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

// Writes to the basicCards.txt file
var writeToBasicCards = function(data) {
    fs.appendFile("basicCards.txt", "\r\n");
    fs.appendFile("basicCards.txt", JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }
        // console.log("basicCards.txt was updated!");
    });
};

// Writes to the clozeCards.txt file
var writeToClozeCards = function(data) {
    fs.appendFile("clozeCards.txt", "\r\n");
    fs.appendFile("clozeCards.txt", JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }
        // console.log("clozeCards.txt was updated!");
    });
};

// App starts by prompting user to select a choice
var start = function () {

    inquirer.prompt([/* Pass your questions in here */
        {
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: ['Make Basic Flashcards', 'Make Cloze Flashcards',
                      'Study Basic Flashcards', 'Study Cloze Flashcards', 'Save']
        }

    ]).then(function (answers) {

        getChoice(answers.selection);

    });

};

// Function for determining which command is executed
var getChoice = function(caseData) {
    switch (caseData) {
        case 'Make Basic Flashcards':
            makeBasicCard();
            break;
        case 'Make Cloze Flashcards':
            makeClozeCard();
            break;
        case 'Study Basic Flashcards':
            studyBasicCard();
            break;
        case 'Study Cloze Flashcards':
            studyClozeCard();
            break;
        case 'Save':
            saveCards();
            break;
        default:
            console.log("Unknown Choice.");
            process.exit();
    }
};

var  makeBasicCard = function () {

    // prompts use to input question and answer
    inquirer.prompt([
        {
            name: "question",
            message: "Input Question."
        }, {
            name: "answer",
            message: "Input Answer."
        }
    ]).then(function(answers) {
        var basicCard = new Cards.BasicCard(answers.question, answers.answer);
        basicCardArr.push(basicCard);

        // prompts the user if they would like to make card again. if yes, run makeBasicCard().
        // if not, go back to main menu.
        inquirer.prompt({
            name: "again",
            type: "confirm",
            message: "Would you like to make another Basic Flashcard?"
        }).then(function(answer) {
            if (answer.again === true) {
                // runs the  makeBasicCard function once more
                makeBasicCard();
            }
            else {
                start();
            }
        });
    });

};

var  makeClozeCard = function () {

    // prompts use to input question and answer
    inquirer.prompt([
        {
            name: "question",
            message: "Input Question."
        }, {
            name: "answer",
            message: "Input Answer."
        }
    ]).then(function(answers) {
        var clozeCard = new Cards.ClozeCard(answers.question, answers.answer);
        clozeCardArr.push(clozeCard);

        // prompts the user if they would like to make card again. if yes, run makeClozeCard().
        // if not, go back to main menu.
        inquirer.prompt({
            name: "again",
            type: "confirm",
            message: "Would you like to make another Cloze Flashcard?"
        }).then(function(answer) {
            if (answer.again === true) {
                // runs the  makeClozeCard function once more
                makeClozeCard();
            }
            else {
                start();
            }
        });

    });

};

var studyBasicFlashcards = function () {
    basicCardFileArr
}



start();