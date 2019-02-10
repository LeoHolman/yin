import * as pg from "./pitchGraphing.js";

export function record() {
    return new Promise(resolve => {
        var audio;
        var audioUrl;
        var audioBlob;
        navigator.mediaDevices.getUserMedia({
                audio: true
            })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                const recordButton = document.getElementById("record");
                recordButton.style.backgroundColor = "red";

                const audioChunks = [];

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener("stop", () => {
                    audioBlob = new Blob(audioChunks, {
                        type: 'audio/wav; codecs=MS_PCM'
                    });
                    audioUrl = URL.createObjectURL(audioBlob);
                    audio = new Audio(audioUrl);
                    audio.type = "audio/wave";
                    resolve(audioBlob);
                });

                setTimeout(() => {
                    mediaRecorder.stop();
                    const recordButton = document.getElementById("record");
                    recordButton.style.backgroundColor = "green";
                    document.getElementById("save").href = audioUrl;
                }, 2000);
            });
    })
};

export function processAudio(audioBlob) {
    return new Promise(resolve => {
        var rawResponse;
        var csvDataLocation;
            var formData = new FormData();
            formData.append("audioData", audioBlob);
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "../pages/audioProcessing.php", true);
            xhttp.send(formData);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //put graph display here
                    //console.log(this.responseText);
                    //console.log(csvData);
                    rawResponse = this.responseText;
                    var start = rawResponse.indexOf("***") + 3;
                    var end = rawResponse.indexOf("&&&");
                    csvDataLocation = rawResponse.substring(start, end);
                    //console.log(csvDataLocation);
                    // pg.drawPitchCurve(csvDataLocation);
                    resolve(csvDataLocation);
                }
            };
        });
    }

