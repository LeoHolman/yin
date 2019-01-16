import * as df from './displayFunctions.js';

var tests;
var testsParsed;
//Access tests.json
$.getJSON("../js/tests.json", function(json){
    tests = json;

    //add stimuli
    df.addSound(tests.test0,"audioSource");

    //present user with options
    df.presentOption("firstResponse",df.pickIncorrectOption(tests.test0));
    df.presentOption("secondResponse",tests.test0.correctOption);

    //set evaluation to occur onclick
    df.addEvaluator("option0",tests.test0);
    df.addEvaluator("option1",tests.test0);
});
