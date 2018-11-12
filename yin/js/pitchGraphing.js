// d3 = import("https://d3js.org/d3.v5.js"); 
//how can i use d3 without importing it?
import * as drawf from './drawingFunctions.js'


//draw canvas with guidelines
var width = 1000;
var height = 350;

//select div target
//import data
drawf.drawPitchChart('#visualization',width,height);

//draw points
d3.tsv("../praat/zhong_pitchtier.csv",function(data) {
    console.log(data.frequency);

    d3.select("#visualization svg")
        .append("circle")
        .attr("cx",data.time*(width/2))
        .attr("cy",height - data.frequency)
        .attr("r",5)
        .style("fill","red");

});
