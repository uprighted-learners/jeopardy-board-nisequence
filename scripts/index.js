//! Do not change the import statement
// This statement imports the exported file so its contents are accessible to us.
// This makes the "placeholderQuestions" act like a variable (essentially).
import placeholderQuestions from "./placeholder-questions.js";
// Is an object whose contents are the file's data
console.log({ placeholderQuestions });
// -------------------------------------------------------------------
console.log(placeholderQuestions[0]);
//! When I need a question/answer, I can iterate over the array.
// ------------------------------
// *Global Variables

let cat1 = document.getElementById("cat1");
console.log(cat1);
let cat2 = document.getElementById("cat2");
console.log(cat2);
let cat3 = document.getElementById("cat3");
console.log(cat3);
let cat4 = document.getElementById("cat4");
console.log(cat4);
let cat5 = document.getElementById("cat5");
console.log(cat5);
let cat6 = document.getElementById("cat6");
console.log(cat6);
let aPts = document.getElementsByClassName("aPts");
console.log(aPts);
let bPts = document.getElementsByClassName("bPts");
console.log(bPts);

let next1 = document.getElementById("next1");
console.log(next1);
let pass1 = document.getElementById("pass1");
console.log(pass1);
let guess1 = document.getElementById("guess1");
console.log(guess1);
let ansInput = document.getElementById("answerBox");
console.log(ansInput);

/* * q boxes by section as array
let cat1Qs = document.getElementsByClass (?); // convert to array
let cat2Qs = document.getElementsByClass (?); // convert to array
let cat3Qs = document.getElementsByClass (?); // convert to array
let cat4Qs = document.getElementsByClass (?); // convert to array
let cat5Qs = document.getElementsByClass (?); // convert to array
let cat6Qs = document.getElementsByClass (?); // convert to array
*/

/* * each q box w/ id
let cat1q200 = document.getElement;
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

// --------------------

/*
on page load --->
    print categories

on next click --->
    does not work if guess has not been selected

on questionBox click --->
    load question that pertains to said category (find tool? fetch?)
    maximize question box to majority of screen
    display: fixed
*/
// ? on guess click --->
    // disable auto refresh of form
    // hide maximized box
    //analyze response (ansInput.value) as correct or incorrect
    console.log(ansInput.value);
    if (ansInput.value = correct) {
        //pointValue = (read point value on front side of card);
        console.log(pointValue);
        teamAPoints = pointValue;
        console.log(teamAPoints);
        aPts.textContent = teamAPoints;
        // make all buttons invalid (except next)
        // next redirects to URL with point value & used question value
    } else if (ansInput.value = " ") {
        let noInputError = "User did not input anything.";
        console.log(noInputError);
        // let errorBox = document.createElement();
        // let errorBox.textContent = noInputError;
    } else { // (ansInput.value = incorrect)
        //make all buttons invalid (except next)
        //next redirects to URL with point value (0) & used question value
    };

/* ? NEXT PAGE --->
let aUrlPts = glean from URL;
console.log(aUrlPts);
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