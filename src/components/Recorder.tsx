'use client';
import React, { useState } from 'react';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import styles from './Recorder.module.scss';

interface RecorderProps {
  label: string;
  outputFunction: Function;
}

export default function Recorder({ label, outputFunction }: RecorderProps) {
  const [buttonStyle, setButtonStyle] = useState<string>(styles.notRecording);
  const [encoderRegistered, setEncoderRegistered] = useState(false);
  async function record(): Promise<Blob> {
    return new Promise(async (resolve) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/wav',
      });
      mediaRecorder.start();
      setButtonStyle(styles.recording);
      const audioChunks: Array<Blob> = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, {
          type: 'audio/wav',
        });
        resolve(audioBlob);
      });

      setTimeout(() => {
        mediaRecorder.stop();
        setButtonStyle(styles.notRecording);
      }, 2000);
    });
  }

  async function processAudio(audioBlob: Blob): Promise<string> {
    return new Promise(async (resolve) => {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recorder.wav');
      const result = await fetch('http://localhost:8080/extract_pitch/wav', {
        method: 'POST',
        body: formData,
      });
      resolve(result.text());
    });
  }

  async function addRecordFunction() {
    // Register wav encoder
    if (!encoderRegistered) {
      await register(await connect());
      setEncoderRegistered(true);
    }
    const blob: Blob = await record();
    const data: string = await processAudio(blob);

    // Remove useless header information
    const lines = data.split('\n');
    lines.splice(0, 3);
    // Add useful column labels
    lines.unshift('time\tfrequency');
    const splicedData = lines.join('\n');
    outputFunction(splicedData);
  }

  return (
    <button
      id='record_button'
      type='button'
      className={buttonStyle}
      onClick={addRecordFunction}
    >
      {label}
    </button>
  );
}
