import * as df from "./displayFunctions.js";

var test0 = {
    audio : "../assets/sounds/test0.mp3",
    options : ["zhong1","zhong2","zhong3","zhong4"],
    get correctOption () {return this.options[0];} 
}

//present stimuli
df.addSound(test0,"audioSource");

//present options
df.presentOption("firstResponse",test0.options[0]);
df.presentOption("secondResponse",test0.options[1]);
df.presentOption("thirdResponse",test0.options[2]);
df.presentOption("fourthResponse",test0.options[3]);

//set evaluation to occur onclick
df.addEvaluator("option0",test0);
df.addEvaluator("option1",test0);
df.addEvaluator("option2",test0);
df.addEvaluator("option3",test0);