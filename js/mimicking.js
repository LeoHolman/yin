import * as af from "./audioFunctions.js";
import * as drawf from "./drawingFunctions.js";
import * as stat from "./stats.js";
import * as df from "./displayFunctions.js";
import * as pi from "./pageInteractions.js";

//set button handles
var recordButton = document.getElementById("record");
var playButton = document.getElementById("play");
var cont = document.getElementById("continue-btn");
const baselineButton = document.getElementById("baseline");

//page setup
pi.pageSetup();
pi.loadTests(3,"huanglaoshiTestsShortened");

//initialize baseline variables
var baselineMax;
var baselineMin;
var baselineAvg;
var baselineMean;
var baselineStandardDeviation;


//draw graph
drawf.drawPitchChart('#visualization',750,350);

//set record function
recordButton.addEventListener("click", () => {
	af.record("record")
		.then( blob => {
			var resetplayButton = playButton.cloneNode(true);
			playButton.parentElement.replaceChild(resetplayButton, playButton);
			playButton = document.getElementById("play");
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
					drawf.drawPitchCurve(csvDataLocation,750,350,baselineMean,baselineStandardDeviation);
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
							baselineMean = stat.calcMean(frequencyset);
                        
						//	console.log(`Baseline mean ${baselineMean}`);
					} );	
				
				});	
			});
	var resetCont = cont.cloneNode(true);
	cont.parentElement.replaceChild(resetCont, cont);
	cont = document.getElementById("continue-btn");
    cont.addEventListener("click",() => {
	    pi.advance(3);
    });
		});

function clearUploads() {
	var clearUploads = new XMLHttpRequest();
	clearUploads.open("GET","../pages/clearUploads.php");
	clearUploads.send();
}

clearUploads();
