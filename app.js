var inquirer = require('inquirer');
var Cards = require('./cards.js');
var fs = require("fs");

var basicCardArr = [];
var clozeCardArr = [];

// ToDo: load cards from file to arrays.
// var basicCardFileArr = [];
// var clozeCardFileArr = [];


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

// Writes cards to file
var writeToFile = function(data, file) {
    fs.appendFile(file, "\r\n");
    fs.appendFile(file, JSON.stringify(data), function(err) {
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
                      'Study Basic Flashcards', 'Study Cloze Flashcards', 'Save and Quit']
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
            basicCardArr.shuffle();
            studyBasicFlashcards(basicCardArr.length-1);
            break;
        case 'Study Cloze Flashcards':
            clozeCardArr.shuffle();
            studyClozeFlashcards(clozeCardArr.length-1);
            break;
        case 'Save and Quit':
            saveCards();
            break;
        default:
            console.log("Unknown Choice.");
            process.exit();
    }
};

var saveCards = function () {
    if (basicCardArr.length) {
        writeToFile(basicCardArr, "basicCards.txt");
    }
    if (clozeCardArr.length) {
        writeToFile(clozeCardArr,"clozeCards.txt");
    }
}

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

var studyBasicFlashcards = function (index) {

    if (index >= 0) {

        inquirer.prompt({
            name: "userInput",
            type: "input",
            message: basicCardArr[index].front
        }).then(function(answer) {
            if (answer.userInput.toLowerCase() === basicCardArr[index].back.toLowerCase()) {
                console.log('CORRECT!');
            } else {
                console.log('The correct answer is '+ basicCardArr[index].showAnswer() + '.');
            }
            index--;
            studyBasicFlashcards(index);
        });

    } else {
        start();
    }
}

var studyClozeFlashcards = function (index) {

    if (index >= 0) {

        inquirer.prompt({
            name: "userInput",
            type: "input",
            message: clozeCardArr[index].front
        }).then(function(answer) {
            if (answer.userInput.toLowerCase() === clozeCardArr[index].back.toLowerCase()) {
                console.log('CORRECT!');
            } else {
                console.log('Incorrect input.');
                clozeCardArr[index].showAnswer();
            }
            index--;
            studyClozeFlashcards(index);
        });

    } else {
        start();
    }
}

start();