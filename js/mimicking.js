import * as pg from "./pitchGraphing.js";
import * as af from "./audioFunctions.js";

const recordButton = document.getElementById("record");
const playButton = document.getElementById("play");
const baselineButton = document.getElementById("baseline");

var baselineMax;
var baselineMin;
var baselineAvg;

recordButton.addEventListener("click", () => {
	af.record("record")
		.then( blob => {
			playButton.addEventListener("click", () => {
				var blobUrl = URL.createObjectURL(blob);
				var audio = new Audio(blobUrl);
				audio.play();
			});
			af.processAudio(blob)
				.then( csvDataLocation => {
					pg.drawPitchCurve(csvDataLocation);
				})	
		})
});

baselineButton.addEventListener("click", () => {
	af.record("baseline")
		.then( blob => {
			af.processAudio(blob)
				.then( csvDataLocation => {
					var frequencyset = [];
					d3.tsv(csvDataLocation,	function(data){
							frequencyset.push(+data.frequency); 
							return frequencyset;
					}).then( () =>{		
							baselineMin = d3.min(frequencyset);
							baselineMax = d3.max(frequencyset); 
							console.log(baselineMax);
							console.log(baselineMin);
					} );	
				
				});	
			});
		});
