import * as df from './displayFunctions.js';
import * as pi from './pageInteractions.js';

var tests;
var testsArray = [];
var shownTests = [];

//Access tests.json
$.getJSON("../js/tests.json", function(json){
    tests = json;

    for(var i in tests){
        testsArray.push(tests [i]);
    }

    //Initial test
    newTest();
});

function newTest(){
    df.setResponseGiven(false);
    document.getElementById("correct").classList.add("hide");
    document.getElementById("incorrect").classList.add("hide");
    
    df.clearResultStyle();
    //find new test
    var thisTestNumber = df.getRandomInt(12);
    while (shownTests.includes(thisTestNumber)){
        thisTestNumber = df.getRandomInt(12);
    }
    shownTests.push(thisTestNumber);
    var thisTest = testsArray[thisTestNumber];
    
    //add stimuli
    console.log(thisTest);
    df.addSound(thisTest, "audioSource");

    //present user with options
    df.presentOption("firstResponse",thisTest.options[0]);
    df.presentOption("secondResponse",thisTest.options[1]);
    df.presentOption("thirdResponse",thisTest.options[2]);
    df.presentOption("fourthResponse",thisTest.options[3]);
//    let diceroll = Math.random();
//    switch (true){
//        case (diceroll <= 0.25):
//            df.presentOption("firstResponse",thisTest.correctOption);
//            df.presentOption("secondResponse",thisTest.options[1]);
//            df.presentOption("thirdResponse",thisTest.options[2]);
//            df.presentOption("fourthResponse",thisTest.options[3]);
//            console.log("case 1");
//            break;
//        case (diceroll > 0.25 && diceroll <= 0.5):
//            df.presentOption("firstResponse",thisTest.options[0]);
//            df.presentOption("secondResponse",thisTest.correctOption);
//            df.presentOption("thirdResponse",thisTest.options[2]);
//            df.presentOption("fourthResponse",thisTest.options[3]);
//            console.log("case 2");
//            break;
//        case (diceroll > 0.5 && diceroll <= 0.75):
//            df.presentOption("firstResponse",thisTest.options[0]);
//            df.presentOption("secondResponse",thisTest.options[1]);
//            df.presentOption("thirdResponse",thisTest.correctOption);
//            df.presentOption("fourthResponse",thisTest.options[3]);
//            console.log("case 3");
//            break;
//        case (diceroll < 0.75):
//            df.presentOption("firstResponse",thisTest.options[0]);
//            df.presentOption("secondResponse",thisTest.options[1]);
//            df.presentOption("thirdResponse",thisTest.options[2]);
//            df.presentOption("fourthResponse",thisTest.correctOption);
//            console.log("case 4");
//            break;
//    }

    //set evaluation to occur onclick
    df.addEvaluator(document.getElementById("firstResponse").firstChild.id,thisTest);
    df.addEvaluator(document.getElementById("secondResponse").firstChild.id,thisTest);
    df.addEvaluator(document.getElementById("thirdResponse").firstChild.id,thisTest);
    df.addEvaluator(document.getElementById("fourthResponse").firstChild.id,thisTest);
    
   if (shownTests.length == 10){
        document.getElementById("continueButton").removeEventListener("    click", function(){
            newTest();
        });
        
        document.getElementById("continueButton").innerHTML="Finish";
        
        document.getElementById("continueButton").addEventListener("click", function(){
            df.showScoreCard("activity-two","lesson-two-ref");
        })
    }
    
}

//create new test on click
document.getElementById("continueButton").addEventListener("click", function(){
    newTest();
    
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
