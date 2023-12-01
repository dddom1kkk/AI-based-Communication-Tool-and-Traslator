const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({ apikey: '***REMOVED***' }),
    serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/857622cd-52d5-49eb-b441-155b56ba1154'
});

app.use(express.static('public')); // Serve static files from 'public' directory

io.on('connection', (socket) => {
  socket.on('audioData', (audioData) => {

    const buffer = Buffer.from(audioData);

    const recognizeParams = {
        audio: buffer,
        contentType: 'audio/l16; rate=44100; endianness=little-endian',
        model: 'en-US_BroadbandModel',
    };

    speechToText.recognize(recognizeParams)
        .then(speechRecognitionResults => {
            if (speechRecognitionResults.result.results.length > 0) {
                const transcription = speechRecognitionResults.result.results[0].alternatives[0].transcript;
                socket.emit('transcription', transcription);
            }
        })
        .catch(err => {
        console.error(err);
        socket.emit('transcriptionError', err);
        });

    // Example of pushing data to the recognize stream (you need to adapt this part)
    // const readable = new Readable();
    // readable._read = () => {}; // _read is required but you can noop it
    // readable.push(buffer);
    // readable.push(null); // Indicates end of stream
    // readable.pipe(recognizeStream);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));