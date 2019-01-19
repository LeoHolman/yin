import * as df from './displayFunctions.js';

var tests;
var testsArray = [];
var shownTests = [];
//Access tests.json
$.getJSON("../js/tests.json", function(json){
    tests = json;

    // //add stimuli
    // df.addSound(tests.test0,"audioSource");

    // //present user with options
    // df.presentOption("firstResponse",df.pickIncorrectOption(tests.test0));
    // df.presentOption("secondResponse",tests.test0.correctOption);

    // //set evaluation to occur onclick
    // df.addEvaluator("option0",tests.test0);
    // df.addEvaluator("option1",tests.test0);
    for(var i in tests){
        testsArray.push(tests [i]);
    }
    newTest();
});

function newTest(){
    //find new test
    var thisTestNumber = getRandomInt(12);
    while (shownTests.includes(thisTestNumber)){
        thisTestNumber = getRandomInt(12);
    }
    shownTests.push(thisTestNumber);
    var thisTest = testsArray[thisTestNumber];
    console.log(shownTests);
    
    //add stimuli
    df.addSound(thisTest, "audioSource");

    //present user with options
    if (Math.random() > 0.5){
        df.presentOption("firstResponse",df.pickIncorrectOption(thisTest));
        df.presentOption("secondResponse",thisTest.correctOption);
    } else {
        df.presentOption("firstResponse",thisTest.correctOption);
        df.presentOption("secondResponse",df.pickIncorrectOption(thisTest));
    }

    //set evaluation to occur onclick
    df.addEvaluator(document.getElementById("firstResponse").firstChild.id,thisTest);
    df.addEvaluator(document.getElementById("secondResponse").firstChild.id,thisTest);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//create new test on click
document.getElementById("continueButton").addEventListener("click", function(){
    newTest();
})