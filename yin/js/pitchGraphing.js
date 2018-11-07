// d3 = import("https://d3js.org/d3.v5.js"); 
//why can i use d3 without importing it?
import * as drawf from './drawingFunctions.js'


//import data
// let data1 = d3.tsv("../praat/zhong_pitchtier.csv",function(data){console.log(data);})

//select div target
//draw canvas with guidelines
var width = 1000;
var height = 400;

drawf.drawPitchChart('#visualization',width,height);
//draw points

d3.tsv("../praat/zhong_pitchtier.csv",function(data) {
    console.log(data.frequency);

    d3.select("#visualization svg")
        .append("circle")
        .attr("cx",data.time*500)
        .attr("cy",data.frequency/3)
        .attr("r",5);

});
