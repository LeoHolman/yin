import * as af from "./audioFunctions.js";
import * as drawf from "./drawingFunctions.js";
import * as stat from "./stats.js";
import * as df from "./displayFunctions.js";

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

//pi.loadTests(3);

var tests;
var testsArray = [];
var shownTests = [];

var huangLaoshifrequencyset = [];
var huangLaoshibaselineStandardDeviation;
//Access tests.json
$.getJSON("../js/huanglaoshiTests.json", function(json){
    tests = json;

    for(var i in tests){
        testsArray.push(tests [i]);
    }

	d3.tsv("../assets/sounds/huanglaoshi/csv/baselineChinese.csv",	function(data){
			huangLaoshifrequencyset.push(+data.frequency); 
			return huangLaoshifrequencyset;
	}).then( () =>{		
	huangLaoshibaselineStandardDeviation = stat.calcStandardDeviation(210,huangLaoshifrequencyset);
	console.log("hls Baseline stndrd dev " +huangLaoshibaselineStandardDeviation);
//	drawf.drawPitchCurve(csvDataLocation,1000,350,210,huangLaoshibaselineStandardDeviation);
	}).then ( () =>{
	    newTest();
	});
});

function newTest(){
	//find new test
	var thisTestNumber = df.getRandomInt(23);
	while (shownTests.includes(thisTestNumber)){
		thisTestNumber = df.getRandomInt(23);
	}
	shownTests.push(thisTestNumber);
	var thisTest = testsArray[thisTestNumber];

	//add stimuli
	df.addSound(thisTest, "audioSource");
	console.log(thisTestNumber);
	let csvFile = testsArray[thisTestNumber].id.replace(/[0-9]/g, '');
	console.log(csvFile);
	console.log("hls Baseline stndrd dev " +huangLaoshibaselineStandardDeviation);
	drawf.drawPitchCurve(`../assets/sounds/huanglaoshi/csv/${csvFile}.csv`, 1000, 350, 210, huangLaoshibaselineStandardDeviation, "blue");
}

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
							baselineMean = stat.calcMean(frequencyset);
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
