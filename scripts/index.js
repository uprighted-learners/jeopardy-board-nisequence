//! Do not change the import statement
// This statement imports the exported file so its contents are accessible to us.
// This makes the "placeholderQuestions" act like a variable (essentially).
import placeholderQuestions from "./placeholder-questions.js";
// Is an object whose contents are the file's data
console.log({ placeholderQuestions });
// -------------------------------------------------------------------
console.log(placeholderQuestions[0]);
// When I need a question/answer, I can iterate over the array.