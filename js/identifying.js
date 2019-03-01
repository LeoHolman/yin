import * as df from './displayFunctions.js';
import * as pi from './pageInteractions.js';

pi.pageSetup();

pi.loadTests(2);

//create new test on click
document.getElementById("continueButton").addEventListener("click", () => {
   pi.newTest(2);
});

document.getElementById("skipToEnd").addEventListener("click", () => {
	df.showScoreCard("activity-two", "lesson-two-ref");
})
