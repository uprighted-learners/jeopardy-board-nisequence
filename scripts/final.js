/*
? FINAL ROUND --->
let aUrlPts = glean from URL;
console.log(aUrlPts);
let aPts.textContent = aUrlPts;
console.log(aPts.textContent);
let bUrlPts = glean from URL;
console.log(bUrlPts);
let bPts.textContent = bUrlPts;
console.log(bPts.textContent);
*/

//! Do not change the import statement
// This statement imports the exported file so its contents are accessible to us.
// This makes the "placeholderQuestions" act like a variable (essentially).
import placeholderQuestions from "./placeholder-questions.js";
// Is an object whose contents are the file's data
console.log({ placeholderQuestions });
// ------------------------------
//console.log(placeholderQuestions[0]); //!test
// When I need a question/answer, I can iterate over the array.
// ------------------------------
/*
! NEXT PAGE --->
let aUrlPts = glean from URL;
let aPts.textContent = aUrlPts;
console.log(aPts.textContent);
use odd numbered questions
*/
//! delete the above when done

// ? Variables for HTML Items

//* Round Header
let aPts = document.getElementsByClassName("aPts")[0];
let bPts = document.getElementsByClassName("bPts")[0];

//* Category Header
let finalCat = document.getElementById("finalCatTextHere");

//* Question Card
let finalQues = document.getElementById("finalQuesTextHere");
let finalAns;

/* invisible question box & section
let questionSelected = document.getElementsByClassName("questionSelected");
let selectionSection = document.getElementsByClassName("superSecret");
*/

//* The stuff at the bottom of the page
let ptsInput = document.getElementById("pointsHere");
let ansInput = document.getElementById("finalAnsBox");
let aBet;
let bBet;
let aGuess;
let bGuess;
let submit = document.getElementById("sendIt"); // the submit button itself

// ? Other Global Variables

// * Header-Related Variables
let params = new URLSearchParams(document.location.search);
let aPtsVar = parseInt(params.get('aPoints')); //! need to make sure this works
aPts.innerText = aPtsVar + " PTS";
let bPtsVar = parseInt(params.get('bPoints')); //! need to make sure this works
bPts.innerText = bPtsVar + " PTS";

// * Question Fetching & Assignment Variables
let qSource = "scripts/questions.json"; // where to find the questions to jsonify
//!
let parentCat; // temp variable for the category that each question belongs to
let pointValue; // temp variable to hold the point value for each question
let startCategory; // temp variable to find the starting point within the JSON file given the category needed (based on parentCat variable)

async function fetchCategory() {
    fetch(qSource) // go get the file
        .then (result => result.json()) // jsonify it
        .then (data => {
            let questionsArray = data.placeholderQuestions; // set the info to a variable
            finalCat.textContent = questionsArray[60].category;
            finalAns = questionsArray[60].answer;
        })
        .catch((err) => console.error(err));
}

async function gatherABet() {
    submit.onclick = () => { // when the first user clicks the submit button
        if (parseInt(ptsInput.value) <= aPtsVar && parseInt(ptsInput.value) >= 0) {
            aBet = parseInt(ptsInput.value); // save wager amount for Team A
            console.log(aBet);
            ptsInput.value = ""; // reset point box
            ansInput.value = ""; // reset answer
            gatherBBet();
        } else if (parseInt(ptsInput.value) === 0) {
            // exception for if Team A has negative points
            aBet = parseInt(ptsInput.value); // save wager amount for Team A
            console.log(aBet);
            ptsInput.value = ""; // reset point box
            ansInput.value = ""; // reset answer
            gatherBBet();
        } else if (parseInt(ptsInput.value) > aPtsVar || parseInt(ptsInput.value < 0)) {
            ansInput.value = "Team A wager amount not accepted!";
            gatherABet();
        } else { //! not sure why negative guesses fall here
            console.log(ptsInput.value);
            ansInput.value = "Letters detected in Team A wager!";
            gatherABet();
        }
    }
}

async function gatherBBet() {
    submit.onclick = () => { // when the 2nd user clicks the submit button
        if (parseInt(ptsInput.value) <= bPtsVar && parseInt(ptsInput.value) >= 0) {
            bBet = parseInt(ptsInput.value); // save wager amount for Team B
            console.log(bBet);
            ptsInput.value = ""; // reset point box
            ansInput.value = ""; // reset answer
            finalQuestion();
        } else if (parseInt(ptsInput.value) === 0) {
            // exception for if Team B has negative points
            bBet = parseInt(ptsInput.value); // save wager amount for Team B
            console.log(bBet);
            ptsInput.value = ""; // reset point box
            ansInput.value = ""; // reset answer
            finalQuestion();
        } else if (parseInt(ptsInput.value) > bPtsVar || parseInt(ptsInput.value < 0)) {
            ansInput.value = "Team B wager amount not accepted!";
            gatherBBet();
        } else {
            ansInput.value = "Letters detected in Team B wager!";
            gatherBBet();
        }
    }
    
}

async function finalQuestion() {
    console.log(finalAns); //! testing
    try {
       let res = await fetch(qSource); // go get the file
        let results = await res.json(); // jsonify it
        let data = results.placeholderQuestions[60]; // pull out the exact object I want
        console.log(data); //! for testing purposes
        finalQues.innerText = data.question; // insert the question onto the card
        submitAnswers();
    } catch(err) {
        console.error(err);
    }
}

async function submitAnswers() {
    submit.onclick = () => { // When Team A clicks submit
        aGuess = ansInput.value; // save guess from Team A
        console.log(aGuess);
        ansInput.value = "Team A answer confirmed."; // reset answer
        ptsInput.value = ""; // reset point box
        submit.onclick = () => { // When Team B clicks submit
            bGuess = ansInput.value; // save guess from Team B
            console.log(bGuess);
            ansInput.value = "Team B answer confirmed."; // reset answer
            ptsInput.value = ""; // reset point box
            answerAnalysis();
        }
    }
}

async function answerAnalysis() {
    // Check Team A first
    if (aGuess == finalAns) { // correct
        addPoints("A", aBet); // give Team A points
    } else if (aGuess != finalAns) { // blank
        subtractPoints("A", aBet);
    }
    // Check Team B second
    if (bGuess == finalAns) { // correct
        addPoints("B", bBet); // give Team B points
    } else if (bGuess != finalAns) { // blank
        subtractPoints("B", bBet);
    }
    ansInput.value = finalAns;
    announceWinner();
}

async function addPoints(team, pointAmount) {
    let pointDigit = parseInt(pointAmount);
    if (team == "A") {
        aPtsVar = parseInt(aPtsVar + pointDigit);
        aPts.innerText = aPtsVar + " PTS";
    } else if (team == "B") {
        bPtsVar = parseInt(bPtsVar + pointDigit);
        bPts.innerText = bPtsVar + " PTS";
    } else {
        console.error("I don't know what team that is!");
    }
}

async function subtractPoints(team, pointAmount) {
    let pointDigit = parseInt(pointAmount);
    if (team == "A") {
        aPtsVar = parseInt(aPtsVar - pointDigit);
        aPts.innerText = aPtsVar + " PTS";
    } else if (team == "B") {
        bPtsVar = parseInt(bPtsVar - pointDigit);
        bPts.innerText = bPtsVar + " PTS";
    } else {
        console.error("I don't know what team that is!");
    }
}

async function announceWinner() {
    if (aPtsVar > bPtsVar) {
        console.log("Team A wins!");
        finalQues.innerText = "Team A wins!";
    } else if (bPtsVar < aPtsVar) {
        console.log("Team B wins!");
        finalQues.innerText = "Team B wins!";
    } else if (aPtsVar === bPtsVar) {
        console.log("It's a tie!");
        finalQues.innerText = "It's a tie!";
    } else {
        console.log("Sorry, I'm confused.");
        finalQues.innerText = "Sorry, I'm confused...";
    }
}

fetchCategory();
gatherABet();