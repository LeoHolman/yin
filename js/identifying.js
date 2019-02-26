import * as df from './displayFunctions.js';
import * as pi from './pageInteractions.js';

pi.loadTests(2);

//create new test on click
document.getElementById("continueButton").addEventListener("click", function(){
   pi.newTest(2);
    
});

document.getElementById("begin-btn").addEventListener("click", () => {
	pi.openActivity()
});

document.getElementById("btn-to-lesson").addEventListener("click", () => {
	pi.closeActivity();
});

function skipToEnd(){
	df.showScoreCard("activity-one", "lesson-one-ref");
}

function checkIfReloaded(){
	var reloading = sessionStorage.getItem("reloaded");
	console.log(`Reloaded is: ${reloading}`);
	if (reloading) {
            sessionStorage.removeItem("reloaded");
	    pi.openActivity();
	}
}

window.onload = checkIfReloaded();
