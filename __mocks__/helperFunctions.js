const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "";
previousFromLanguage = "English";
previousToLanguage = "French";
previousUserInput = "";
const SystemContent =
  "You will be provided a sentence in a language, and your task is to translate it into another language that is provided.";
const SummarySystemContent =
  "You will be provided a paragraph, you job is to summarize it into 3-10 points. in the language it was asked in.";

let translatedText =
  "Dans le marché animé de Jaipur, Rajan, un Indien d'âge moyen passionné par les traditions vibrantes, s'est lancé dans une quête du turban parfait. Guidé par les échos de la culture ancienne, il a navigué à travers les étals ornés de tissus et de teintes riches. Ses yeux brillaient d'anticipation alors qu'il effleurait les plis de soie, chacun racontant une histoire de tradition et de fierté. Après une longue contemplation, il a choisi un turban éclatant safran, symbolisant le courage et le sacrifice. En quittant le marché, le turban couronnait sa tête tel un emblème royal, incarnant non seulement un morceau de tissu, mais aussi un lien précieux avec son patrimoine.";
let summarrizedText;

let translatedTextWithDetect =
  "You will be provided a sentence in a language, and your task is to translate it into another language that is provided. If the from language is 'Detect', detect the language and output the data as an array [language, translation]";

/**
 * This function checks if text that the user entered is empty.
 * @param {String} userInput - Text that the user put in.
 * @returns {boolean} - True if the string is empty and false if not.
 */
function isEmpty(userInput) {
  if (userInput == null || userInput.trim() == "") {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if the language the user wants to translate from and the language the
 * user wants to translate to are different.
 *
 * @param {String} fromLanguage - The language the user wants to translate from.
 * @param {String} toLanguage - The language the user wants to translate to.
 */
function areLanguagesSame(fromLanguage, toLanguage) {
  if (fromLanguage == toLanguage) {
    return true;
  }
  return false;
}

function isUserInputTheSame(userInput, fromLanguage, toLanguage) {
  if (
    userInput == previousUserInput &&
    fromLanguage == previousFromLanguage &&
    toLanguage == previousToLanguage
  ) {
    return true;
  }
  return false;
}

/**
 * Sends the request for translation to openAI API and returns translated
 * text as a string
 *
 * @param {string} fromLanguage - The language the user wants to translate from.
 * @param {string} toLanguage - The language the user wants to translate to.
 * @param {string} userInput - The text the user wants to translate.
 *
 * @return {string} Translated text
 */
const getTranslation = async (fromLanguage, toLanguage, userInput) => {
  // Build the string you want to send to the chatGPT API.
  // The form is: From: Language1, To: Language2, Sentence: userInput
  let prompt =
    "From: " +
    fromLanguage +
    ", To: " +
    toLanguage +
    ", sentence: " +
    userInput;

  isValid = isValidInput(userInput, fromLanguage, toLanguage);
  if (isValid == true) {
    if (fromLanguage != "Detect Language") {
      return await postWithoutDetect(prompt);
    } else {
      return await postWithDetect(prompt);
    }
  } else {
    return isValid;
  }
};

// Integration Tests
function getSummarization(text) {
  // TODO: Check if the paragraph is more than 100 words.
  let summaryButton = document.getElementById("summaryButton");

  if (hasBeenSummarized == false) {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },

      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: SummarySystemContent,
          },
          { role: "user", content: translatedText },
        ],
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        return response.choices[0].message.content;
      })
      .catch((error) => {
        return error;
      });
  }
}

/**
 *
 * @param {String} translatedText - Translated text from openAI API.
 */
function showTranslatedText(translatedText) {
  let outputArea = document.getElementById("toOutput");
  document.innerHTML = "";

  outputArea.innerHTML = translatedText;
}

async function postWithoutDetect(prompt) {
  return Promise.resolve("Hey comment allez-vous?");
}

async function postWithDetect(prompt) {
  // Array with first element being the detected language and second being the translation.
  let translation = ["English", "Hey comment allez-vous?"];
  return Promise.resolve(translation);
}

/**
 * This functions checks if the text that the user entered is valid.
 * @param {String} userInput - The text the user want to translate.
 *
 */
function isValidInput(userInput, fromLanguage, toLanguage) {
  if (isEmpty(userInput) == true) {
    return "The text you want to translate can not be empty.";
    //return false;
  }
  if (areLanguagesSame(fromLanguage, toLanguage) == true) {
    return "Please pick from language that is different from the language you want to translate to.";
    //return false;
  }
  if (isUserInputTheSame(userInput, fromLanguage, toLanguage) == true) {
    return "Please ensure that the text you want translated is different from your last.";
    //return false;
  }

  return true;
}

/**
 * This function sperates the code and the language and returns them as an array
 * [code, language].
 * @param {String} languageString
 * @returns
 */
function separateLanguageAndCode(languageString) {
  let parts = languageString.split(" ");
  let code = parts.shift(); // Remove and get the language code
  let language = parts.join(" "); // Get the remaining part as language
  return [code, language];
}

/**
 * Create a options element that can be appended to the language dropdown menu.
 *
 * @param {String} langValue
 * @param {String} displayName
 */
function createOptionElement(langValue, displayName) {
  // Create the option for the from language.
  let languageOption = document.createElement("option");
  languageOption.value = langValue;
  languageOption.innerHTML = displayName;

  return languageOption;
}

/**
 *
 * @param {String} userInput
 * @param {String} fromLanguage
 * @param {String} toLanguage
 * @returns
 */
function isUserInputSame(userInput, fromLanguage, toLanguage) {
  const previousUserInput = "hi";
  const previousFromLanguage = "French";
  const previousToLanguage = "English";

  if (
    userInput == previousUserInput &&
    fromLanguage == previousFromLanguage &&
    toLanguage == previousToLanguage
  ) {
    return true;
  }
  return false;
}

let isListening;

function startSpeechRecognition() {
  console.log("Active");
  isListening = true;
}

function endSpeechRecognition() {
  console.log("Ended");
  isListening = false;
}

function resultOfSpeechRecognition(event) {
  // This takes the results that speech recognition event gives and
  // shows it in the input text as the user is saying words.
  let transcript = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  let inputTextBox = document.getElementById("fromInput");
  inputTextBox.value = transcript;
}

// Check if the browser supports speech recognition.
if (isSpeechRecognitionSupported()) {
  //  SpeechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  //  inputTextBox = document.getElementById("fromInput");
  //  SpeechRecognition.interimResults = true;
  //  SpeechRecognition.onstart = startSpeechRecognition;
  //  SpeechRecognition.onend = endSpeechRecognition;
  //  SpeechRecognition.onresult = resultOfSpeechRecognition;
} else {
  console.log("Sorry, your browser does not support speech recognition.");
}

function listenText() {
  if (!isListening) {
    // Start listening to speech.
    let fromLang = "French";
    if (fromLang == "Detect Language") {
      // SpeechRecognition.lang = "en-US";
    } else {
      // SpeechRecognition.lang = fromLang;
    }
    let speechRecog = new SpeechRecognition();
    speechRecog.start();
  } else {
    // Stop listening to speech.
    SpeechRecognition.stop();
  }
}

/**
 * Checks if speech recognition is supported by the browser or not.
 */
function isSpeechRecognitionSupported() {
  // const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
  // if (SpeechRecognition) {
  //     return false;
  // } else {
  //     return true;
  // }

  return true;
}

function listenPlayPause() {
  const textToSynthesize = document.getElementById("toOutput").value;
  const rateOfSpeech = 2.0;

  const utterance = new SpeechSynthesisUtterance(textToSynthesize);
  utterance.lang = document.getElementById("toLanguage").value;
  utterance.rate = rateOfSpeech;

  window.speechSynthesis.speak(utterance);
}

class SpeechRecognition {
  constructor() {
    this.isListening = false;
    this.onresult = null;
  }

  start() {
    console.log("Speech recognition started");
    this.isListening = true;

    if (this.onresult) {
      const mockEvent = {
        results: [[{ transcript: 'Mocked transcript' }]]
      };
      this.onresult(mockEvent);
    }
  }

  stop() {
    console.log("Speech recognition stopped");
    this.isListening = false;
  }

  // Other methods or properties can be added as needed
}

class SpeechSynthesisUtterance {
  constructor(text = "") {
    this.text = text;
    this.lang = "en-US";
    this.rate = 1.0;
  }
}

function changeVoiceSpeed() {
  let rate = document.getElementById("rate");
  let rateText = document.getElementById("rate-text");

  if (rate) {
    rate.addEventListener("input", (event) => {
      rateText.innerHTML = "Speed(" + event.target.value + ")";
    });
  }
}

module.exports = {
  isEmpty,
  areLanguagesSame,
  getTranslation,
  separateLanguageAndCode,
  createOptionElement,
  isUserInputSame,
  showTranslatedText,
  listenPlayPause,
  SpeechRecognition,
  SpeechSynthesisUtterance,
  changeVoiceSpeed,
};