import * as df from './displayFunctions.js';

//test objects
var test0 = {
    audio : "../assets/sounds/test0.mp3",
    options : ["zhong1","zhong2","zhong3","zhong4"],
    get correctOption () {return this.options[0];} 
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

//prompt user to select option
df.addSound(test0,"audioSource");
presentOption("firstResponse",df.pickIncorrectOption(test0));
presentOption("secondResponse",test0.correctOption);

//set evaluation to only occur onclick
document.getElementById("option0").addEventListener("click",function(){df.evaluateResponse("option0",test0);});

document.getElementById("option1").addEventListener("click",function(){df.evaluateResponse("option1",test0);});

