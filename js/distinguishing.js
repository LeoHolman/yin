import * as df from './displayFunctions.js';

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
    document.getElementById("correct").classList.add("hide");
    document.getElementById("incorrect").classList.add("hide");
    
    //find new test
    var thisTestNumber = df.getRandomInt(12);
    while (shownTests.includes(thisTestNumber)){
        thisTestNumber = df.getRandomInt(12);
    }
    shownTests.push(thisTestNumber);
    var thisTest = testsArray[thisTestNumber];
    
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
    
    //reset responseGiven for new test
    df.setResponseGiven(false);

    if (shownTests.length == 10){
        document.getElementById("continueButton").removeEventListener("    click", function(){
            newTest();
        });
        
        document.getElementById("continueButton").innerHTML="Finish";
        
        document.getElementById("continueButton").addEventListener("click", function(){
            df.showScoreCard("activity-one");
        })
    }
}

//create new test on click
document.getElementById("continueButton").addEventListener("click", function(){
    newTest();
})
