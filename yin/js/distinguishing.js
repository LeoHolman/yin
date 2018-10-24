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

var uniqueOptions = 0;

function presentOption(parentDiv,option){
    let parentDivHandle = document.getElementById(parentDiv);
    let newNode = document.createElement("DIV");
    newNode.className = "response";
    newNode.classList.add("options");
    newNode.id = "option"+uniqueOptions;
    uniqueOptions++;
    let optionText = document.createTextNode(option);
    newNode.appendChild(optionText);
    parentDivHandle.appendChild(newNode);
}


addSound(test0,"audioSource");
presentOption("firstResponse",pickIncorrectOption(test0));
presentOption("secondResponse",test0.correctOption);


//prompt user to select option


//evaluate user selection
    //if correct highlight green
    //repeat correct stimuli

    //if incorrect highlight red
    //repeat correct stimuli

function evaluateResponse(option,test) {
    let response = document.getElementById(option).innerText;
    if (response === test.correctOption){
        changeBackgroundColor(option,"green");
    } else {
        changeBackgroundColor(option,"red");
    }
}

function changeBackgroundColor(divId,color) {
    let divIdHandle = document.getElementById(divId);
    divIdHandle.style.backgroundColor = color;
}


evaluateResponse("option0",test0);
evaluateResponse("option1",test0);
//set evaluation to only occur onclick


