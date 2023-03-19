//! Do not change the import statement
// This statement imports the exported file so its contents are accessible to us.
// This makes the "placeholderQuestions" act like a variable (essentially).
import placeholderQuestions from "./placeholder-questions.js";
// Is an object whose contents are the file's data
console.log({ placeholderQuestions });
// -------------------------------------------------------------------
//console.log(placeholderQuestions[0]); //test
// When I need a question/answer, I can iterate over the array.
// ------------------------------
// *Global Variables

// Category Headers
let cat1 = document.getElementById("cat1");
let cat2 = document.getElementById("cat2");
let cat3 = document.getElementById("cat3");
let cat4 = document.getElementById("cat4");
let cat5 = document.getElementById("cat5");
let cat6 = document.getElementById("cat6");

let catArray = [cat1, cat2, cat3, cat4, cat5, cat6]; // Group Headers
let catIteration = 0; // iteration to go thru catArray
let rightCat = 0; // iteration to skip thru json file by category

let questionSelected = document.getElementsByClassName("questionSelected");
let selectionSection = document.getElementsByClassName("superSecret");

let teamUp = document.getElementById("teamUp");
console.log(teamUp);
let teamArray = [">>> Team A <<<", ">>> Team B <<<"];
let tagTeam = 0;
let attempts = 0; //! need to use this to fix Team B advantage (Team A will never get a chance if they go 1st)

let aPts = document.getElementsByClassName("aPts")[0];
//console.log(aPts);
let bPts = document.getElementsByClassName("bPts")[0];
//console.log(bPts);
let aPtsVar = 0;
let bPtsVar = 0;

let next1 = document.getElementById("next1");
let pass1 = document.getElementById("pass1");
let guess1 = document.getElementById("guess1");
let ansInput = document.getElementById("answerBox");
console.log(ansInput);

let parentCat;
let pointValue;
let cQuestionTest;
let startCategory;

let qCardCollection = document.getElementsByClassName("questionCard");
let newQCardArray = Array.from(qCardCollection);
console.log(newQCardArray);
for (let i = 0; i < newQCardArray.length; i++) {
    newQCardArray[i].onclick = () => {
        parentCat = newQCardArray[i].parentNode.id; // e.g. "questions1"
        //console.log(parentCat);
        pointValue = newQCardArray[i].innerText; // e.g. "200"
        cQuestionTest = `We need a question for ${parentCat} that would give the user ${pointValue} if answered correctly.`;
        if (parentCat == "questions1") {
            startCategory = 0;
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions2") {
            startCategory = 10;
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions3") {
            startCategory = 20;
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions4") {
            startCategory = 30;
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
        newQCardArray[i].className = "hide";
    }
}

let qSource = "scripts/questions.json";
async function fetchCategories() {
    fetch(qSource)
        .then (result => result.json()) // no ;
        .then (data => {
            let questionsArray = data.placeholderQuestions;
            //console.log(questionsArray); //! test
            while (catIteration < 6) {
                //console.log(questionsArray[rightCat].category);
                catArray[catIteration].textContent = questionsArray[rightCat].category;
                catIteration++;
                rightCat = rightCat + 10;
            }
        }) // no ;
        .catch((err) => console.error(err));
}

async function findQuestion(cat, points) {
    console.log(`You selected a question from the category beginning at array # ${cat} worth ${points} points.`);
    let howToFind = cat + ((points / 100) - 2);
    try {
        // console.log(howToFind); // works
        let res = await fetch(qSource);
        let results = await res.json();
        let data = results.placeholderQuestions[howToFind];
        console.log(data); //! for testing purposes
        selectionSection[0].id = ""; // this will make it impossible for user to select new question
        //! add onclick event for selectionSection that tells user to answer or pass
        questionSelected[0].id = "";
        questionSelected[0].innerText = data.question;
        enablePass();
        guess1.onclick = () => {
            console.log(ansInput.value); //! testing
            console.log(data.answer); //! testing
            if (ansInput.value == data.answer) {
                console.log("Yay! You got it!");
                addPoints(points); // give the correct team points
                hideTheQuestion();
                endGuessing();
            } else if (ansInput.value == "") {
                let noInputError = "User did not input anything.";
                console.log(noInputError); //! send alert to users instead
            } else { // wrong answer
                console.log("Nice try...");
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
                }
            }
        }
    } catch(err) {
        console.error(err);
    }
}

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
        }
        //  only 1 chance to pass
        pass1.onclick = () => {
            // do nothing 2nd time
        }
    }
}

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

async function hideTheQuestion() { // call this after both teams get it wrong and/or pass
    questionSelected[0].id = "invis";
    selectionSection[0].id = "hideIt";
    attempts = 0; // reset attempts to 0 as this question has been discarded
}

async function endGuessing() {
    guess1.onclick = () => {
        console.log("Do nothing");
    }
    checkIfLimitReached();
}

async function checkIfLimitReached() { //! need to test this function
    if (aPtsVar >= 15000 || bPtsVar >= 15000 || newQCardArray[0] == undefined) {
        console.log("maxed out pts for this round or used all questions");
        next1.onclick = () => {
            console.log("Hi users, you can move on now.");
            //! need to alert users (not in console)
            console.log(`I need to send the users to a URL to page two with the values of ${aPtsVar} for Team A and ${bPtsVar} for Team B.`);
            //! don't forget to actually do this
        }
    }
}
// --------------------
// on page load --->
fetchCategories();

/*
? NEXT PAGE --->
This page comes when either a or b has 15,000 points OR all questions are cleared
1st of all... next redirects to URL with point value (0)
let aUrlPts = glean from URL;
let aPts.textContent = aUrlPts;
console.log(aPts.textContent);
let usedQues = glean from URL;
console.log(usedQues);
// gray out used question (identify from URL)
*/

/* ? FINAL ROUND --->
let aUrlPts = glean from URL;
console.log(aUrlPts);
let aPts.textContent = aUrlPts;
console.log(aPts.textContent);
let bUrlPts = glean from URL;
console.log(bUrlPts);
let bPts.textContent = bUrlPts;
console.log(bPts.textContent);
*/