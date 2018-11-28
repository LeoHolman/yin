'use strict';

export function addSound (test,sourceId){
    let target = document.getElementById(sourceId);
    target.src = test.audio;
    target.parentElement.load();
}

export function pickIncorrectOption(test){
    let option;
    option = test.options[Math.floor(Math.random() * test.options.length) ];
    if (option == test.correctOption){
        option = pickIncorrectOption(test);
    } 
    return option;
}

//evaluate user selection
    //if correct highlight green
    //repeat correct stimuli

    //if incorrect highlight red
    //repeat correct stimuli

export function evaluateResponse(option,test) {
    let response = document.getElementById(option).innerText;
    if (response === test.correctOption){
        resultStyle(option,"correct");
//        var cor = document.getElementById("correct");
//        cor.classList.remove("hide");
//        var incor =document.getElementById("incorrect");
//        incor.classList.add("hide");
    } else {
        resultStyle(option,"incorrect");
//        var incor = document.getElementById("incorrect");
//        incor.classList.remove("hide");
//        var cor = document.getElementById("correct");
//        cor.classList.add("hide");
    }
}
    
export function resultStyle(divId,score) {
    let divIdHandle = document.getElementById(divId);

    clearResultStyle();
    
    if (score == "correct"){
        var cor = document.getElementById("correct");
        cor.classList.remove("hide");
        var incor =document.getElementById("incorrect");
        incor.classList.add("hide");
    } else if (score =="incorrect"){
         var cor = document.getElementById("correct");
        cor.classList.add("hide");
        var incor =document.getElementById("incorrect");
        incor.classList.remove("hide");
    }
    
    divIdHandle.classList.add(score);
}

export function clearResultStyle(){
    let clear = document.getElementsByClassName("response");
    
    for (var i=0; i<clear.length;i++){
        if (clear[i].classList.contains("correct")){
            clear[i].classList.remove("correct");
        }else if (clear[i].classList.contains("incorrect")){
            clear[i].classList.remove("incorrect");
        }
    }
    
}

export var uniqueOptions = 0;

export function presentOption(parentDiv,option){
    let parentDivHandle = document.getElementById(parentDiv);
    let newNode = document.createElement("DIV");
    newNode.className = "response";
    newNode.classList.add("options");
    newNode.id = "option"+uniqueOptions;
    uniqueOptions++;
    let optionText = document.createTextNode(option);
    
    let image = document.createElement("IMG");
    var imageSrc = null;
    var lastChar = option[option.length-1];
    
    switch (lastChar){
        case "1":
            imageSrc = "../assets/images/1_graph.svg";
            break;
        case "2":
            imageSrc = "../assets/images/2_graph.svg";
            break;
        case "3":
            imageSrc = "../assets/images/3_graph.svg";
            break;
        case "4":
            imageSrc = "../assets/images/4_graph.svg";
            break;
        default:
            break;
    }
    
    image.src = imageSrc;
    image.className = "graphOption";
    
    newNode.appendChild(image);
    newNode.appendChild(optionText);
    parentDivHandle.appendChild(newNode);
}

export function addEvaluator(optionID,testID){
    let option = document.getElementById(optionID);
    option.addEventListener("click",function(){evaluateResponse(optionID,testID);});
}