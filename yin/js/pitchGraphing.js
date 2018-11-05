// d3 = import("https://d3js.org/d3.v5.js"); 
//why can i use d3 without importing it?

let div = document.getElementById("visualization");
let data1 = d3.csv("../praat/zhong_pitchtier.csv",function(data){console.log(data);})
d3.select(div).append("p").text("d3 is working");


//import data

//select div target
//draw canvas
//draw guidelines
//draw points
//draw lines between points