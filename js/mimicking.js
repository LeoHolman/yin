import * as drawf from "./drawingFunctions.js";
import * as df from "./displayFunctions.js";
// import p5 from "./p5/p5.js";
// import "./p5/addons/p5.sound.js";

var test0 = {
    audio : "../assets/sounds/test0.mp3",
    options : ["zhong1","zhong2","zhong3","zhong4"],
    get correctOption () {return this.options[0];} 
}

df.addSound(test0,"audioSource");

var s = function( p ) {
  var mic, recorder, soundFile;
  var state = 0; 
  p.setup = function() { 
    p.createCanvas(400, 400);
    mic = new p5.AudioIn()
    mic.start();
    p.background(220);
    p.text("click to record",20,20);
    // create a sound recorder
    recorder = new p5.SoundRecorder();
    // connect the mic to the recorder
    recorder.setInput(mic);
    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();
} 

p.mousePressed = function () {
 // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
 if (state === 0 && mic.enabled) {

   // Tell recorder to record to a p5.SoundFile which we will use for playback
   recorder.record(soundFile);

   p.background(255,0,0);
   p.text('Recording now! Click to stop.', 20, 20);
   state++;
 }

 else if (state === 1) {
   recorder.stop(); // stop recorder, and send the result to soundFile

   p.background(0,255,0);
   p.text('Recording stopped. Click to play & save', 20, 20);
   state++;
 }

 else if (state === 2) {
   soundFile.play(); // play the result!
   p.saveSound(soundFile, 'export.wav'); // save file
   state++;
 }
}
};

var myp5 = new p5(s);