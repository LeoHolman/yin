var audio;
const recordButton = document.getElementById("record");

function record(){
  navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      recordButton.style.backgroundColor = "red";

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        audio = new Audio(audioUrl);
      });

      setTimeout(() => {
        mediaRecorder.stop();
        recordButton.style.backgroundColor = "green";
      }, 2000);
  });
};

document.getElementById("play").addEventListener("click", () => {
    audio.play();
});

document.getElementById("record").addEventListener("click", () => {
  record();
});