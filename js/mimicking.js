import * as af from "./audioFunctions.js";
import * as drawf from "./drawingFunctions.js";
import * as stat from "./stats.js";
import * as df from "./displayFunctions.js";
import * as pi from "./pageInteractions.js";



//set button handles
const recordButton = document.getElementById("record");
var playButton = document.getElementById("play");
const baselineButton = document.getElementById("baseline");

//page setup
pi.pageSetup();
pi.loadTests(3,"huanglaoshiTests");

//initialize baseline variables
var baselineMax;
var baselineMin;
var baselineAvg;
var baselineMean;
var baselineStandardDeviation;


var cont = document.getElementById("continue-btn");

//switch from baseline to activity view
function advance() {
    document.getElementById("activity-3-baseline").style.display ="none";
    document.getElementById("activity-3-content").style.display ="block";
    cont.removeEventListener("click",advance);
    cont.addEventListener("click", () => {
	//d3.selectAll("svg > .userPitch").remove();
	   pi.newTest(3);
	});
}

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
    cont.addEventListener("click",advance);
		});

function clearUploads() {
	var clearUploads = new XMLHttpRequest();
	clearUploads.open("GET","../pages/clearUploads.php");
	clearUploads.send();
}

clearUploads();

//if(typeof baselineAvg !== 'undefined'){
//    cont.addEventListener("click",advance);
//}
//

