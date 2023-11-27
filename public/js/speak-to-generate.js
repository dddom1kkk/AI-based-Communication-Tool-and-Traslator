
let SpeechRecognition;
let isListening;

function startSpeechRecognition () {
    console.log("Active");
    isListening = true;
   }

function endSpeechRecognition () {
    console.log("Ended");
    isListening = false;
}

function resultOfSpeechRecognition (event) {
    let transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    let inputTextBox = document.getElementById("fromInput");
    inputTextBox.value = transcript;
}

// Check if the browser supports speech recognition.    
if (isSpeechRecognitionSupported()) {
   SpeechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)(); 
   inputTextBox = document.getElementById("fromInput");

   SpeechRecognition.interimResults = true;

   SpeechRecognition.onstart = startSpeechRecognition;

   SpeechRecognition.onend = endSpeechRecognition;

   SpeechRecognition.onresult = resultOfSpeechRecognition;

    
} else {
    alert("Sorry, your browser does not support speech recognition.")
}

function listenText() {
    if (!isListening) {
        // Start listening to speech. 
        SpeechRecognition.start();

    } else {
        // Stop listening to speech.
        SpeechRecognition.stop();
    }

}

/**
 * Checks if speech recognition is supported by the browser or not. 
 */
function isSpeechRecognitionSupported() {
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        return true;
    } else {
        return false;
    }

}