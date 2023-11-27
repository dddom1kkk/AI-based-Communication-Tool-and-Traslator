#!/usr/bin/env node

const fs = require('fs');
const WebSocket = require('ws');
const { Readable } = require('stream');

const CHUNK = 1024;
const FORMAT = 'int16';
const CHANNELS = 1;
const RATE = 44100;
const RECORD_SECONDS = 5;
const FINALS = [];
let LAST = null;

const REGION_MAP = {
    'us-east': 'gateway-wdc.watsonplatform.net',
    'us-south': 'stream.watsonplatform.net',
    'eu-gb': 'stream.watsonplatform.net',
    'eu-de': 'stream-fra.watsonplatform.net',
    'au-syd': 'gateway-syd.watsonplatform.net',
    'jp-tok': 'gateway-syd.watsonplatform.net',
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function readAudio(ws, timeout) {
    const p = require('node-record-lpcm16');
    const audioStream = new Readable({
        read() {},
    });

    console.log('* recording');

    p.start({
        sampleRate: RATE,
        channels: CHANNELS,
        format: FORMAT,
    })
        .pipe(audioStream);

    const rec = timeout || RECORD_SECONDS;

    audioStream.on('data', data => {
        ws.send(data, { opcode: 2 });
    });

    // Record for a specified duration
    setTimeout(() => {
        p.stop();
        console.log('* done recording');

        // Send stop action to get a final response from STT
        ws.send(JSON.stringify({ action: 'stop' }));

        // Wait before closing the websocket
        sleep(1000).then(() => {
            ws.close();
        });
    }, rec * 1000);
}

function onMessage(msg) {
    const data = JSON.parse(msg);

    if ('results' in data) {
        if (data.results[0].final) {
            FINALS.push(data);
            LAST = null;
        } else {
            LAST = data;
        }
        console.log(data.results[0].alternatives[0].transcript);
    }
}

function onError(error) {
    console.error(error);
}

function onClose() {
    if (LAST) {
        FINALS.push(LAST);
    }
    const transcript = FINALS.map(x => x.results[0].alternatives[0].transcript).join('');
    console.log(transcript);
}

function onOpen(ws) {
    const data = {
        action: 'start',
        'content-type': `audio/l16;rate=${RATE}`,
        continuous: true,
        interim_results: true,
        word_confidence: true,
        timestamps: true,
        max_alternatives: 3,
    };

    ws.send(JSON.stringify(data));

    // Start a dedicated thread to read and stream audio
    readAudio(ws, ws.timeout);
}

function getUrl() {
  const region = 'us-south';  // Update with your region
  const host = REGION_MAP[region];
  const apiKey = '***REMOVED***';  // Replace with your actual API key
  return `wss://${host}/speech-to-text/api/v1/recognize?model=en-US_BroadbandModel&apikey=${apiKey}`;
}

function getAuth() {
    return [`apikey`, '***REMOVED***'];
}

function parseArgs() {
    const args = process.argv.slice(2);
    const timeoutIndex = args.indexOf('-t');
    const timeout = timeoutIndex !== -1 ? parseInt(args[timeoutIndex + 1]) : 5;
    return { timeout };
}

async function main() {
    const args = parseArgs();
    const [username, password] = getAuth();
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
    const url = getUrl();

    const ws = new WebSocket(url, {
        headers: {
            Authorization: authHeader,
        },
    });

    ws.on('message', onMessage);
    ws.on('error', onError);
    ws.on('close', onClose);
    ws.on('open', () => onOpen(ws));

    // Add timeout property to WebSocket instance
    ws.timeout = args.timeout * 1000;

    // This blocks until the ws.close() gets called
    await new Promise(() => {});
}

main();

// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const path = require('path');
// const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// app.get('/speak-to-translate.js', (req, res) => {
//   res.setHeader('Content-Type', 'application/javascript');
//   res.sendFile(__dirname + '/speak-to-translate.js');
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'speak-to-translate.html'));
//   });

// const authenticator = new IamAuthenticator({ apikey: '***REMOVED***' });
// const speechToText = new SpeechToTextV1({
//   authenticator,
//   serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/857622cd-52d5-49eb-b441-155b56ba1154',
// });

// io.on('connection', (socket) => {
//     console.log('Client connected');
  
//     // Handle audio data from the client
//     socket.on('audioData', (data) => {
//       const params = {
//         audio: Buffer.from(data, 'base64'),
//         contentType: 'audio/l16; rate=16000',
//         model: 'en-US_BroadbandModel',
//       };
  
//       speechToText.recognize(params)
//         .then(response => {
//           const transcript = response.result.results[0].alternatives[0].transcript;
//           console.log('Transcription:', transcript);
//           socket.emit('transcription', { text: transcript });
//         })
//         .catch(err => {
//           console.error(err);
//           socket.emit('transcription', { text: 'Error in transcription' });
//         });
//     });
  
//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });

// const port = process.env.PORT || 3000;
// http.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// // const storage = multer.memoryStorage();
// // const upload = multer({ storage: storage });

// // app.post('/transcribe', upload.single('audio'), (req, res) => {
// //     // Extract audio data from the uploaded file
// //     console.log('req.file:', req.file);
// //     const audioData = req.file.buffer;
  
// //     // Set parameters for the IBM Watson Speech to Text API
// //     const params = {
// //       audio: audioData,
// //       contentType: 'audio/wav',
// //       model: 'en-AU_NarrowbandModel',
// //     };

// //     speechToText.recognize(params)
// //     .then(response => {
// //       // Extract the transcription from the API response
// //       const transcription = response.result.results[0].alternatives[0].transcript;
      
// //       // Send the transcription as JSON response
// //       res.json({ transcription });
// //     })
// //     .catch(error => {
// //       // Handle errors and send an error response
// //       console.error('Speech to Text error:', error);
// //       res.status(500).json({ error: 'Speech to Text error' });
// //     });
// // });

// // // const command = ffmpeg(videoFilePath)
// // //   .audioBitrate(160)
// // //   .audioFrequency(44100)
// // //   .audioCodec('pcm_s16le')
// // //   .on('end', () => {
// // //     console.log('Audio extraction finished');

// // //     // Speech to Text using IBM Watson
// // //     const apiKey = '***REMOVED***';
// // //     const serviceUrl = 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/857622cd-52d5-49eb-b441-155b56ba1154';

// // //     const authenticator = new IamAuthenticator({ apikey: apiKey });
// // //     const speechToText = new SpeechToTextV1({ authenticator, serviceUrl });

// // //     const params = {
// // //       audio: fs.createReadStream(audioFilePath),
// // //       contentType: 'audio/wav',
// // //       model: 'en-AU_NarrowbandModel',
// // //     };

// // //     speechToText.recognize(params)
// // //       .then(response => {
// // //         console.log(JSON.stringify(response.result, null, 2));
// // //       })
// // //       .catch(err => {
// // //         console.error('Speech to Text error:', err);
// // //       });
// // //   })
// // //   .on('error', err => {
// // //     console.error('Audio extraction error:', err);
// // //   })
// // //   .save(audioFilePath);
