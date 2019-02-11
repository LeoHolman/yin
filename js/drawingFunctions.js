'use strict';

export function drawPitchChart(divID, width, height) {
    d3.select(divID)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', '#eeeeee');

    var y = 2;
    var i;
    for (i = 0; i < 5; i++) {
        d3.select('#visualization svg')
            .append('line')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)
            .style('stroke', '#000000')
            .style('stroke-width', '3px');
        if (i == 3) {
            y -= 4;
        }
        y += (height / 4);
    }
}

export function drawPitchCurve(dataset, width, height, baseline) {
    d3.tsv(dataset, function(data) {
        d3.select("#visualization svg")
            .append("circle")
            .attr("cx", data.time * (width / 2))
            .attr("cy", height - data.frequency)
            .attr("r", 5)
            .style("fill", "red");
    })
}