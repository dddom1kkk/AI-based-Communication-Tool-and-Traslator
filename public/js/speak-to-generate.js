// speak-to-translate.js

const startButton = document.getElementById('start-recording');
const transcriptDiv = document.getElementById('transcript');
const translationDiv = document.getElementById('translation');

// Function to start recording speech
function startSpeechRecognition() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US'; // Set this to the language you want to recognize
    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        transcriptDiv.textContent = `Transcription: ${speechToText}`;
        sendToWhisper(speechToText);
    };
    recognition.start();
}

// Function to send the speech text to the Whisper API endpoint
function sendToWhisper(speechText) {
    // This URL is a placeholder; you'll need to replace it with your actual Whisper API endpoint
    const whisperApiUrl = 'https://your-whisper-api-endpoint.com/transcribe';

    fetch(whisperApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speech: speechText })
    })
    .then(response => response.json())
    .then(data => {
        const transcribedText = data.transcription;
        translateText(transcribedText, 'es'); // Replace 'es' with the target language code
    })
    .catch(error => console.error('Error with Whisper API:', error));
}

// Function to translate text using a translation API
function translateText(text, targetLanguage) {
    // This URL and key are placeholders; replace them with your actual translation API endpoint and key
    const translationApiUrl = 'https://your-translation-api-endpoint.com/translate';
    const apiKey = 'YOUR_TRANSLATION_API_KEY';

    fetch(translationApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            text: text,
            targetLanguage: targetLanguage
        })
    })
    .then(response => response.json())
    .then(data => {
        translationDiv.textContent = `Translation: ${data.translatedText}`;
    })
    .catch(error => console.error('Error with Translation API:', error));
}

// Event listener for the start button
startButton.addEventListener('click', startSpeechRecognition);
