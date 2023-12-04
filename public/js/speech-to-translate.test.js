const {
  listenPlayPause,
  SpeechRecognition,
  changeVoiceSpeed,
} = require("../../__mocks__/helperFunctions");

// Integration test 4
describe("Mock the SpeechRecognition function and see if it is called.", () => {
  test("start method should be called", () => {
    // Create a spy on the start method
    const startSpy = jest.spyOn(SpeechRecognition.prototype, "start");

    const speechRecognition = new SpeechRecognition();

    speechRecognition.start();

    expect(startSpy).toHaveBeenCalled();
    startSpy.mockRestore();
  });
});

window.listenPlayPause = listenPlayPause;

// Create the DOM for the test.
document.body.innerHTML = `
<!DOCTYPE html>
<html>
  <body>
    <textarea id="toOutput"></textarea>
    <input type="range" id="rate">
    <div id="rate-text"></div>
    <button id="play-pause-button" onclick="listenPlayPause()" disabled="true"></button>
    <select id="toLanguage">
      <option value="en-US">English</option>
      <!-- Add other language options as needed -->
    </select>
    <button id="play-pause-button" onclick="listenPlayPause()" disabled="true">Play/Pause</button>
  </body>
</html>
`;

// Mock the the Speech systhesis object
const mockSpeechSynthesis = {
  speak: jest.fn(),
};

// Attach the mockSpeechSynthesis to the window object
Object.defineProperty(window, "speechSynthesis", {
  value: mockSpeechSynthesis,
});

// The integration tests tests that the speechSyntesis starts is at least called to start one time.
// When the play button is pressed.
describe("Integration Tests", () => {
  it("should call listenPlayPause and speak when button is clicked", () => {
    const spyListenPlayPause = jest.spyOn(window, "listenPlayPause");

    const button = document.getElementById("play-pause-button");
    button.disabled = false;
    button.click();

    expect(spyListenPlayPause).toHaveBeenCalled();
  });
});


describe('changeVoiceSpeed and listenPlayPause integration', () => {
    it('updates the rateText and sets rate in listenPlayPause when rate input changes', () => {
      // Call your functions to set up event listeners
      changeVoiceSpeed();
  
      // Simulate input change event
      const rateInput = document.getElementById('rate');
      rateInput.value = 0.5;
      rateInput.dispatchEvent(new Event('input'));
  
      // Assert that rateText is updated
      const rateText = document.getElementById('rate-text');
      expect(rateText.innerHTML).toBe('Speed(0.5)');

    });
  });
