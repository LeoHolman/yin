//test objects
var test0 = {
    audio : "../assets/sounds/test0.mp3",
    options : ["zhong1","zhong2","zhong3","zhong4"],
    get correctOption () {return this.options[0];} 
}


//display stimuli
function addSound (test,sourceId){
    let target = document.getElementById(sourceId);
    target.src = test.audio;
}

//present options
function pickIncorrectOption(test){
    let option;
    option = test.options[Math.floor(Math.random() * test.options.length) ];
    if (option == test.correctOption){
        option = pickIncorrectOption(test);
    } 
    return option;
}

function presentOption(option,parentDiv){
 
}

addSound(test0,"audioSource");

//prompt user to select option

//evaluate user selection
    //if correct highlight green
    //repeat correct stimuli

    //if incorrect highlight red
    //repeat correct stimuli