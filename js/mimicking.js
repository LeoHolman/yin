import * as af from "./audioFunctions.js";
import * as drawf from "./drawingFunctions.js";
import * as stat from "./stats.js";

//set button handles
const recordButton = document.getElementById("record");
const playButton = document.getElementById("play");
const baselineButton = document.getElementById("baseline");

//initialize baseline variables
var baselineMax;
var baselineMin;
var baselineAvg;
var baselineMean;
var baselineStandardDeviation;

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
					var frequencyset = [];
					d3.tsv(csvDataLocation,	function(data){
							frequencyset.push(+data.frequency); 
							return frequencyset;
					}).then( () =>{		
					baselineStandardDeviation = stat.calcStandardDeviation(baselineMean,frequencyset);
					console.log(`Standard deviation is ${baselineStandardDeviation}`);
					drawf.drawPitchCurve(csvDataLocation,1000,350,baselineMean,baselineStandardDeviation);
					})	
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
						//	baselineMean = stat.calcMean(frequencyset);
						//	console.log(`Baseline mean ${baselineMean}`);
					} );	
				
				});	
			});
		});


function clearUploads() {
	var clearUploads = new XMLHttpRequest();
	clearUploads.open("GET","../pages/clearUploads.php");
	clearUploads.send();
}

clearUploads();
