import * as df from './displayFunctions.js';
import * as $ from './jquery/jquery-3.3.1.min.js';

//test objects
var test0 = {
    audio : "../assets/sounds/test0.mp3",
    options : ["zhong1","zhong2","zhong3","zhong4"],
    get correctOption () {return this.options[0];} 
}

//add stimuli
df.addSound(test0,"audioSource");

//present user with options
df.presentOption("firstResponse",df.pickIncorrectOption(test0));
df.presentOption("secondResponse",test0.correctOption);

//set evaluation to occur onclick
df.addEvaluator("option0",test0);
df.addEvaluator("option1",test0);

$.getJSON("tests.json", function(json){
    console.log(json);
});