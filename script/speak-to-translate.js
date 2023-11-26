const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// Audio extraction using ffmpeg
const videoFilePath = 'vid.mp4';
const audioFilePath = './vid.wav';

const command = ffmpeg(videoFilePath)
  .audioBitrate(160)
  .audioFrequency(44100)
  .audioCodec('pcm_s16le')
  .on('end', () => {
    console.log('Audio extraction finished');

    // Speech to Text using IBM Watson
    const apiKey = '***REMOVED***';
    const serviceUrl = 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/857622cd-52d5-49eb-b441-155b56ba1154';

    const authenticator = new IamAuthenticator({ apikey: apiKey });
    const speechToText = new SpeechToTextV1({ authenticator, serviceUrl });

    const params = {
      audio: fs.createReadStream(audioFilePath),
      contentType: 'audio/wav',
      model: 'en-AU_NarrowbandModel',
    };

    speechToText.recognize(params)
      .then(response => {
        console.log(JSON.stringify(response.result, null, 2));
      })
      .catch(err => {
        console.error('Speech to Text error:', err);
      });
  })
  .on('error', err => {
    console.error('Audio extraction error:', err);
  })
  .save(audioFilePath);

// command.run();

function showSettings() {

  var settings = document.getElementById("edit");

  console.log(settings.style.display)
  
  if (settings.style.display == "none" || settings.style.display.length == 0)
    settings.style.display = "block";
  else
    settings.style.display = "none";

}