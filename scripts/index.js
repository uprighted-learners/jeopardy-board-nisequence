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

let aPts = document.getElementsByClassName("aPts")[0];
//console.log(aPts);
let bPts = document.getElementsByClassName("bPts")[0];
//console.log(bPts);
let aPtsVar = 0;
let bPtsVar = 0;
let teamUp = document.getElementById("teamUp");
console.log(teamUp);

let next1 = document.getElementById("next1");
//! needs to be enabled when A or B reaches 15,000 points or when all questions are selected
let pass1 = document.getElementById("pass1");
let guess1 = document.getElementById("guess1");
let ansInput = document.getElementById("answerBox");
console.log(ansInput);

let parentCat;
let pointValue;
let cQuestionTest;
let cQuestion;
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
        //! console.log(cQuestionTest); test
        if (parentCat == "questions1") {
            console.log("This is from cat1");
            startCategory = 0;
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions2") {
            console.log("This is from cat2");
            startCategory = 10;
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions3") {
            console.log("this is from cat3");
            startCategory = 20;
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions4") {
            console.log("this is from cat4");
            startCategory = 30;
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions5") {
            console.log("this is from cat5");
            startCategory = 40;
            findQuestion(startCategory, pointValue);
        } else if (parentCat == "questions6") {
            console.log("this is from cat6");
            startCategory = 50;
            findQuestion(startCategory, pointValue);
        } else {
            console.error("something went wrong....");
        }
        newQCardArray[i].className = "hide";
    }
}

/* * each q box w/ id
let cat1q200 = document.getElements
let cat1q400 = document.getElement;
let cat1q600 = document.getElement;
let cat1q800 = document.getElement;
let cat1q1000 = document.getElement;
let cat2q200 = document.getElement;
let cat2q400 = document.getElement;
let cat2q600 = document.getElement;
let cat2q800 = document.getElement;
let cat2q1000 = document.getElement;
let cat3q200 = document.getElement;
let cat3q400 = document.getElement;
let cat3q600 = document.getElement;
let cat3q800 = document.getElement;
let cat3q1000 = document.getElement;
let cat4q200 = document.getElement;
let cat4q400 = document.getElement;
let cat4q600 = document.getElement;
let cat4q800 = document.getElement;
let cat4q1000 = document.getElement;
let cat5q200 = document.getElement;
let cat5q400 = document.getElement;
let cat5q600 = document.getElement;
let cat5q800 = document.getElement;
let cat5q1000 = document.getElement;
let cat6q200 = document.getElement;
let cat6q400 = document.getElement;
let cat6q600 = document.getElement;
let cat6q800 = document.getElement;
let cat6q1000 = document.getElement;
*/
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
    let howToFind = (points / 100) - 2;
    try {
        // console.log(howToFind); // works
        let res = await fetch(qSource);
        let results = await res.json();
        let data = results.placeholderQuestions[howToFind];
        console.log(data);
        selectionSection[0].id = ""; // this will make it impossible for user to select new question
        //! add onclick event for selectionSection that tells user to answer or pass
        questionSelected[0].id = "";
        questionSelected[0].innerText = data.question;
        enablePass();
        guess1.onclick = () => {
            console.log(ansInput.value);
            console.log(data.answer);
            console.log(questionSelected);
            console.log(selectionSection);
            if (ansInput.value == data.answer) {
                console.log("Yay! You got it!");
                addPoints(points);
                questionSelected[0].id = "invis";
                selectionSection[0].id = "hideIt";
            } else if (ansInput.value == "") {
                let noInputError = "User did not input anything.";
                console.log(noInputError);
            } else { // wrong answer
                console.log("Nice try...");
                subtractPoints(points);
                teamUp.textContent = ">>> Team B <<<"; //! need to make this & Team A variables and iterate to/from - only 1 chance per team

                //! maybe do more fancy stuff later if time
            }
        }
    } catch(err) {
        console.error(err);
    }
}

async function enablePass() {
    pass1.onclick = () => {
        teamUp.textContent = ">>> Team B <<<";
        //! need to make this & Team A variables and iterate to/from - only 1 chance to pass
        
        //! maybe do more fancy stuff later if time
    }
}

async function addPoints(pointAmount) {
    let pointDigit = parseInt(pointAmount);
    if (teamUp.textContent == ">>> Team A <<<") {
        aPtsVar = parseInt(aPtsVar + pointDigit);
        aPts.innerText = aPtsVar + " PTS";
        guess1.onclick = () => { //! need to move this so that guess1 button works for Team B
            console.log("Do nothing");
        }
    } else if (teamUp.textContent == ">>> Team B <<<") {
        bPtsVar = parseInt(bPtsVar + pointDigit);
        bPts.innerText = bPtsVar + " PTS";
        guess1.onclick = () => { //! need to move this so that guess1 button works for Team B
            console.log("Do nothing");
        }
    } else {
        console.error("I don't know what team that is!");
    }
}

async function subtractPoints(pointAmount) {
    let pointDigit = parseInt(pointAmount);
    if (teamUp.textContent == ">>> Team A <<<") {
        aPtsVar = parseInt(aPtsVar - pointDigit);
        aPts.innerText = aPtsVar + " PTS";
        guess1.onclick = () => {
            console.log("Do nothing");
        }
    } else if (teamUp.textContent == ">>> Team B <<<") {
        bPtsVar = parseInt(bPtsVar - pointDigit);
        bPts.innerText = bPtsVar + " PTS";
        guess1.onclick = () => {
            console.log("Do nothing");
        }
    } else {
        console.error("I don't know what team that is!");
    }
}

async function notGuessed() { //! need to call this after both teams get it wrong
    questionSelected[0].id = "invis";
    selectionSection[0].id = "hideIt";
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