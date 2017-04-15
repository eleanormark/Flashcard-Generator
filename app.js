var inquirer = require('inquirer');
var Cards = require('./cards.js');
var fs = require("fs");


// Writes to the basicCards.txt file
var writeToBasicCards = function(data) {
    fs.appendFile("basicCards.txt", "\r\n\r\n");
    fs.appendFile("basicCards.txt", JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("basicCards.txt was updated!");
    });
};

// Writes to the clozeCards.txt file
var writeToClozeCards = function(data) {
    fs.appendFile("clozeCards.txt", "\r\n\r\n");
    fs.appendFile("clozeCards.txt", JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("clozeCards.txt was updated!");
    });
};

// App starts by prompting user to select a choice
var start = function () {

    inquirer.prompt([/* Pass your questions in here */
        {
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: ['Make Basic Flashcards', 'Make Cloze Flashcards']
        }

    ]).then(function (answers) {
        // Use user feedback for... whatever!!

        if (answers.selection === 'Make Basic Flashcards') {
            makeBasicCard();
        } else {
            makeClozeCard();
        }
    });

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
        writeToBasicCards(basicCard);

        // runs the  makeBasicCard function once more
        makeBasicCard();
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
        writeToClozeCards(clozeCard);

        // runs the  makeBasicCard function once more
        makeClozeCard();
    });

};

start();