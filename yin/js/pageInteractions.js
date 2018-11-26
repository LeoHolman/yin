function openActivity(){
    var slide = document.getElementsByClassName("LA")[0];
    slide.setAttribute("style", "grid-template-columns: 1fr 2fr;");
    
    var ref = document.getElementById("lesson-one-ref");
    ref.setAttribute("onclick","closeActivity()");
    ref.classList.remove("hide");
    
    var lesson = document.getElementById("lesson-one");
    lesson.classList.add("hide");
    
    var actPrompt = document.getElementById("activity-one-prompt");
    actPrompt.classList.add("hide");
    
    var activity = document.getElementById("activity-one");
    activity.classList.remove("hide");
}

function closeActivity(){
    var slide = document.getElementsByClassName("LA")[0];
    slide.setAttribute("style", "grid-template-columns: 2fr 1fr");
    
    var lesson = document.getElementById("lesson-one");
    lesson.setAttribute("onclick","");
    lesson.classList.remove("hide");
    
    var ref = document.getElementsByClassName("view-2")[0];
    ref.classList.add("hide");
    
    var actPrompt = document.getElementById("activity-one-prompt");
    actPrompt.classList.remove("hide");
    
    var activity = document.getElementById("activity-one");
    activity.classList.add("hide");
}

