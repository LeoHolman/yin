import * as pg from "./pitchGraphing.js";
import * as af from "./audioFunctions.js";

const recordButton = document.getElementById("record");
const playButton = document.getElementById("play");

recordButton.addEventListener("click", () => {
	af.record()
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

