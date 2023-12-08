const {
    SpeechRecognition,
    SpeechSynthesisUtterance,
    listenPlayPause,
    changeVoiceSpeed
} = require('../../__mocks__/helperFunctions');

describe('Speech-To-Translate Integration Tests', () => {

let mockElement;

beforeEach(() => {
    mockElement = {
    value: '',
    innerHTML: '',
    textContent: '',
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn()
    };

    global.document = {
    getElementById: jest.fn(() => mockElement),
    createElement: jest.fn(() => ({ src: '', play: jest.fn() }))
    };

    global.window = {
    speechSynthesis: { speak: jest.fn() }
    };

    global.SpeechRecognition = SpeechRecognition;
    global.SpeechSynthesisUtterance = SpeechSynthesisUtterance;
});

// Speech-to-Text Integration Test
test('should transcribe speech correctly', () => {
    const speechRecognition = new SpeechRecognition();
    speechRecognition.onresult = (event) => {
        document.getElementById('fromInput').value = event.results[0][0].transcript;
    };
    
    speechRecognition.start();
    
    expect(document.getElementById('fromInput').value).toBe('Mocked transcript');
});

// Text-to-Speech Integration Test
test('should synthesize text correctly', () => {
    document.getElementById('toOutput').value = 'Text is working when synthesized correctly';
    
    listenPlayPause();
    
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
    expect(window.speechSynthesis.speak.mock.calls[0][0].text).toBe('Text is working when synthesized correctly');
    });

// Customization of Speech Voice Test
test('should apply voice speed customization correctly', () => {
    mockElement.value = '2.0';
    changeVoiceSpeed();

    listenPlayPause();

    expect(window.speechSynthesis.speak).toHaveBeenCalled();
    expect(window.speechSynthesis.speak.mock.calls[0][0].rate).toBe(2.0);
});

});