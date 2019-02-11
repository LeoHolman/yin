import * as af from "./audioFunctions.js";
import * as drawf from "./drawingFunctions.js";

//set button handles
const recordButton = document.getElementById("record");
const playButton = document.getElementById("play");
const baselineButton = document.getElementById("baseline");

//initialize baseline variables
var baselineMax;
var baselineMin;
var baselineAvg;

//draw graph
drawf.drawPitchChart('#visualization',1000,350);

//set record function
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
					drawf.drawPitchCurve(csvDataLocation,1000,350);
				})	
		})
});

//set baseline function
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
