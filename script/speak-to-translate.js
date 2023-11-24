// Setting up the Speech Recognition and Synthesis API
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: '{apikey}',
  }),
  serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com',
});

function showSettings() {

  var settings = document.getElementById("edit");

  console.log(settings.style.display);
  
  if (settings.style.display == "none" || settings.style.display.length == 0)
    settings.style.display = "block";
  else
    settings.style.display = "none";

}