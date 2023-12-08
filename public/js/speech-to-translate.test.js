const {
    SpeechRecognition,
    SpeechSynthesisUtterance,
    listenPlayPause,
    changeVoiceSpeed
} = require('../../__mocks__/helperFunctions');

describe('Speech-To-Translate Integration Tests', () => {

    let mockFromInput, mockToOutput, mockToLanguage;

    beforeEach(() => {
        mockFromInput = { value: '' };
        mockToOutput = { value: '' };
        mockToLanguage = { value: 'en-US' };

        document.getElementById = jest.fn((id) => {
            if (id === 'fromInput') return mockFromInput;
            if (id === 'toOutput') return mockToOutput;
            if (id === 'toLanguage') return mockToLanguage;
            return null;
        });

        global.window = {
            speechSynthesis: {
              speak: jest.fn()
            }
        };
    });

// Speech-to-Text Integration Test
test('should transcribe speech correctly', () => {
    const speechRecognition = new SpeechRecognition();
    speechRecognition.onresult = (event) => {
      mockFromInput.value = event.results[0][0].transcript;
    };
    
    speechRecognition.start();
  
    expect(mockFromInput.value).toBe('Mocked transcript');
  });

// Text-to-Speech Integration Test
test('should synthesize text correctly', () => {
    mockToOutput.value = 'Text is working when synthesized correctly';
    listenPlayPause();
    
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
    expect(window.speechSynthesis.speak.mock.calls[0][0].text).toBe('Text is working when synthesized correctly');
    });

// Customization of Speech Voice Test
test('should apply voice speed customization correctly', () => {
    let mockRateElement = { value: '2.0', addEventListener: jest.fn() };
  
    document.getElementById = jest.fn((id) => {
        if (id === 'rate') return mockRateElement;
        return null;
    });

    changeVoiceSpeed();

    listenPlayPause();

    expect(window.speechSynthesis.speak).toHaveBeenCalled();
    expect(window.speechSynthesis.speak.mock.calls[0][0].text).toBe('Hello world');
});

});