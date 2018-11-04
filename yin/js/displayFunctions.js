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
        changeBackgroundColor(option,"green");
    } else {
        changeBackgroundColor(option,"red");
    }
}
    
export function changeBackgroundColor(divId,color) {
    let divIdHandle = document.getElementById(divId);
    divIdHandle.style.backgroundColor = color;
}