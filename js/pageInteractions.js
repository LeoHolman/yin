function openActivity(){
    var slide = document.getElementsByClassName("LA")[0];
    slide.setAttribute("style", "grid-template-columns: 20vw 50vw;");
    
    var ref = document.getElementsByClassName("lesson")[1];
    ref.setAttribute("onclick","closeActivity()");
    ref.classList.remove("hide");
    
    var lesson = document.getElementsByClassName("lesson")[0];
    lesson.classList.add("hide");
    
    var actPrompt = document.getElementsByClassName("activity")[0];
    actPrompt.classList.add("hide");
    
    var activity = document.getElementsByClassName("activity")[1];
    activity.classList.remove("hide");
}

function closeActivity(){
    var slide = document.getElementsByClassName("LA")[0];
    slide.setAttribute("style", "grid-template-columns: 2fr 1fr");
    
    var lesson = document.getElementsByClassName("lesson")[0];
    lesson.setAttribute("onclick","");
    lesson.classList.remove("hide");
    
    var ref = document.getElementsByClassName("lesson")[1];
    ref.classList.add("hide");
    
    var actPrompt = document.getElementsByClassName("activity")[0];
    actPrompt.classList.remove("hide");
    
    var activity = document.getElementsByClassName("activity")[1];
    activity.classList.add("hide");
}


