//! Do not change the import statement
// This statement imports the exported file so its contents are accessible to us.
// This makes the "placeholderQuestions" act like a variable (essentially).
import placeholderQuestions from "./placeholder-questions.js";
// Is an object whose contents are the file's data
// console.log({ placeholderQuestions });
// ------------------------------
//console.log(placeholderQuestions[0]); //test
// When I need a question/answer, I can iterate over the array.
// ------------------------------
// ? Variables for HTML Items

//* Round Header
let teamUp = document.getElementById("teamUp");
let aPts = document.getElementsByClassName("aPts")[0];
let bPts = document.getElementsByClassName("bPts")[0];

//* Category Headers
let cat1 = document.getElementById("cat1");
let cat2 = document.getElementById("cat2");
let cat3 = document.getElementById("cat3");
let cat4 = document.getElementById("cat4");
let cat5 = document.getElementById("cat5");
let cat6 = document.getElementById("cat6");

//* All the Question Cards
let qCardCollection = document.getElementsByClassName("questionCard");

//* The temporarily invisible question box & section
let questionSelected = document.getElementsByClassName("questionSelected");
let selectionSection = document.getElementsByClassName("superSecret");

//* The stuff at the bottom of the page
let pass1 = document.getElementById("pass1");
let ansInput = document.getElementById("answerBox");
let guess1 = document.getElementById("guess1");
let next1 = document.getElementById("next1");
let roundTwo = "./round-2.html?aPoints="; //! need to test

// ? Other Global Variables

// * Header-Related Variables
let teamArray = [">>> Team A <<<", ">>> Team B <<<"];
let tagTeam = 0; // determines whether to use index 0 or 1 of teamArray
let attempts = 0; // determines when it is time to move on from a question
let aPtsVar = 0; // running total of how many points Team A has
let bPtsVar = 0; // running total of how many points Team B has

// * Category Fetching Variables
let catArray = [cat1, cat2, cat3, cat4, cat5, cat6]; // group headers
let catIteration = 0; // iteration to go thru catArray
let rightCat = 0; // iteration to skip thru json file by category

// * Question Fetching & Assignment Variables
let qSource = "scripts/questions.json"; // where to find the questions to jsonify
let parentCat; // temp variable for the category that each question belongs to
let pointValue; // temp variable to hold the point value for each question
let startCategory; // temp variable to find the starting point within the JSON file given the category needed (based on parentCat variable)
let newQCardArray = Array.from(qCardCollection); // converts question cards into an array
let runningTotal = 30; // keep track of all available questions

// ? The Functions!

// * This function fills in the categories
async function fetchCategories() {
    fetch(qSource) // go get the file
        .then (result => result.json()) // jsonify it
        .then (data => {
            let questionsArray = data.placeholderQuestions; // set the info to a variable
            while (catIteration < 6) { // do this 6 times
                catArray[catIteration].textContent = questionsArray[rightCat].category; // give each of the category headers a different category
                catIteration++;
                rightCat = rightCat + 10;
            }
        })
        .catch((err) => console.error(err));
}

// * This function will find a question for a given question card when clicked
async function findQuestion(cat, points) {
    //console.log(`You selected a question from the category beginning at array #${cat} worth ${points} points.`);
    let howToFind = cat + ((points / 100) - 2);
    /*
    The howToFind variable calculates the exact index for the question that has been selected based on the category and the point value. For example, point value 200 equates to the 1st question in a category (index 0 for category one), while point value 1000 equates to the 9th question in a category (index 8 for category one).
    */
   try {
       let res = await fetch(qSource); // go get the file
        let results = await res.json(); // jsonify it
        let data = results.placeholderQuestions[howToFind]; // pull out the exact object I want
        console.log(data); //! for testing purposes
        selectionSection[0].id = ""; // this will make it impossible for user to select a new question until the current one has been dealt with
        //! add onclick event for selectionSection that tells user to answer or pass
        questionSelected[0].id = ""; // show the question card
        questionSelected[0].innerText = data.question; // insert the question onto the card
        enablePass(); // give the team opportunity to use the pass button
        guess1.onclick = () => { // when the user clicks the guess button
            if (ansInput.value == data.answer) { // correct
                addPoints(points); // give the correct team points
                hideTheQuestion();
                endGuessing();
                attempts = 0;
                // now we are ready for a new question to be selected
            } else if (ansInput.value == "") { // blank
                // do nothing
            } else { // wrong answer
                subtractPoints(points); // subtract points from the correct team
                tagTeam++; // advance to next team's turn
                attempts++; // note that an attempt has been made on this question
                if (tagTeam > 1) { // if at end of teamArray
                    tagTeam = tagTeam - 2; // reset teamArray starting point
                }
                teamUp.textContent = teamArray[tagTeam]; // switch teams
                //! maybe do more fancy stuff later if time
                if (attempts > 1) { // if 2 or more attempts have been made on this question
                    hideTheQuestion();
                    endGuessing();
                    attempts = 0;
                    // now we are ready for a new question to be selected
                }
            }
            ansInput.value = ""; //! test this
        }
    } catch(err) {
        console.error(err);
    }
}

// * This function allows passing once per question and tracks when it is time to discard a question
async function enablePass() {
    pass1.onclick = () => {
        tagTeam++; // advance to the next team's turn
        attempts++; // Team who passes does not get to guess afterward even if 2nd team guesses wrong
        if (tagTeam > 1) { // if at end of teamArray
            tagTeam = tagTeam - 2; // reset teamArray starting point
        }
        teamUp.textContent = teamArray[tagTeam]; // switch teams
        //! maybe do more fancy stuff later if time
        if (attempts > 1) { // if 2 or more attempts have been made on this question
            hideTheQuestion();
            endGuessing();
            attempts = 0;
            // now we are ready for a new question to be selected
        }
        pass1.onclick = () => { // pass can only be used once per question
            // do nothing 2nd time
        }
    }
}

// * This function adds points to the correct team
async function addPoints(pointAmount) {
    let pointDigit = parseInt(pointAmount);
    if (teamUp.textContent == ">>> Team A <<<") {
        aPtsVar = parseInt(aPtsVar + pointDigit);
        aPts.innerText = aPtsVar + " PTS";
    } else if (teamUp.textContent == ">>> Team B <<<") {
        bPtsVar = parseInt(bPtsVar + pointDigit);
        bPts.innerText = bPtsVar + " PTS";
    } else {
        console.error("I don't know what team that is!");
    }
}

// * This function subtracts points from the correct team
async function subtractPoints(pointAmount) {
    let pointDigit = parseInt(pointAmount);
    if (teamUp.textContent == ">>> Team A <<<") {
        aPtsVar = parseInt(aPtsVar - pointDigit);
        aPts.innerText = aPtsVar + " PTS";
    } else if (teamUp.textContent == ">>> Team B <<<") {
        bPtsVar = parseInt(bPtsVar - pointDigit);
        bPts.innerText = bPtsVar + " PTS";
    } else {
        console.error("I don't know what team that is!");
    }
}

// * This function will take the giant question card and invisible section away
async function hideTheQuestion() { // call this after both teams have had a chance or one team is correct
    questionSelected[0].id = "invis";
    selectionSection[0].id = "hideIt";
}

// * This function turns off the ability for the teams to guess after the question has been discarded
async function endGuessing() {
    guess1.onclick = () => {
        console.log("Do nothing"); //! testing
    }
    checkIfLimitReached();
}

// * This function monitors whether or not it is time for the users to move on to the next round
async function checkIfLimitReached() {
    if (aPtsVar >= 15000 || bPtsVar >= 15000 || runningTotal == 0) { // if either team has at least 15000 or if all questions are used
        selectionSection[0].id = ""; // disable selection of more questions
        questionSelected[0].id = ""; // reusing this for an alert because I'm short on time
        questionSelected[0].innerText = "All questions have been answered or 15000 points have been obtained by at least one team.\n\nPlease move to the next round.";
        next1.onclick = () => {
            console.log(`I need to send the users to a URL to page two with the values of ${aPtsVar} for Team A and ${bPtsVar} for Team B.`);
            document.location = roundTwo + aPtsVar + "&bPoints=" + bPtsVar;
            //! don't forget to test this
        }
    }
}

// ? On Page Load --->
fetchCategories(); // labels the category headers

// * This for loop makes each of the cards clickable and identifies which card is which
for (let i = 0; i < newQCardArray.length; i++) { // make the questions clickable
    newQCardArray[i].onclick = () => {
        parentCat = newQCardArray[i].parentNode.id; // e.g. "questions1"
        pointValue = newQCardArray[i].innerText; // e.g. "200"
        if (parentCat == "questions1") { // if the question card selected belongs to the section called "question1", we know its should come from category 1
            startCategory = 0; // 1st category holds indices 0-9
            findQuestion(startCategory, pointValue); // go find a question based on the starting index and point value
        } else if (parentCat == "questions2") {
            startCategory = 10; // 2nd cat holds indices 10-19
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions3") {
            startCategory = 20; // 3rd cat holds indices 20-29
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions4") {
            startCategory = 30; // etc
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions5") {
            startCategory = 40;
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions6") {
            startCategory = 50;
            findQuestion(startCategory, pointValue);
        } else {
            console.error("something went wrong....");
        }
        newQCardArray[i].className = "hide"; // makes the question fade to the background
        runningTotal--; // one less question to choose from!
    }
}