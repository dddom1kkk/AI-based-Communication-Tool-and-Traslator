const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const SystemContent =
  "You will be provided a sentence in a language, and your task is to translate it into another language that is provided. Do not show the romanized version.";
const SummarySystemContent =
  "You will be provided a paragraph, you job is to summarize it into 3-10 points. in the language it was asked in. Do not show the romanized version.";

let translatedText = "";
let summarrizedText;

const translatedTextWithDetect =
  "You will be provided a sentence in a language, and your task is to translate it into another language that is provided. If the from language is 'Detect', detect the language and output the data as an array [from_language's language code-region code, translation]. Do not show the romanized version. and make sure the first letter of language is capitalized. If the language is en make it en-US";

let hasBeenSummarized = false;

let previousToLanguage;
let previousFromLanguage;
let previousUserInput;

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

  if (isValidInput(userInput, fromLanguage, toLanguage) == true) {
    if (fromLanguage != "Detect Language") {
      postWithoutDetect(prompt);
    } else {
      postWithDetect(prompt);
    }
  }
};

function getSummarization() {
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
        summarrizedText = response.choices[0].message.content;
        showTranslatedText(
          translatedText + "\n \n \n-----Summary-------\n \n" + summarrizedText
        );
        summaryButton.disabled = "true";
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

function translateText() {
  // Get all the required information from the HTML page.
  const fromLanguage = document.getElementById("fromLanguage").value;
  const toLanguage = document.getElementById("toLanguage").value;
  const userInput = document.getElementById("fromInput").value;

  // Gets the translatedText from chatGPT using openAI API
  translatedText = getTranslation(fromLanguage, toLanguage, userInput);

  previousFromLanguage = fromLanguage;
  previousToLanguage = toLanguage;
  previousUserInput = userInput;

  // Shows the translated text in the HTML page.
}

async function postWithoutDetect(prompt) {
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
          content: SystemContent,
        },
        { role: "user", content: prompt },
      ],
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      translatedText = response.choices[0].message.content;
      showTranslatedText(translatedText);
      document.getElementById("summaryButton").disabled = false;

      // If a play button exists, enable it after recieving translation.
      if (document.getElementById("play-pause-button")) {
        let playButton = document.getElementById("play-pause-button");
        playButton.disabled = false;
      }
    })
    .catch((error) => {
      return error;
    });
}

async function postWithDetect(prompt) {
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
          content: translatedTextWithDetect,
        },
        { role: "user", content: prompt },
      ],
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      translatedText = response.choices[0].message.content;
      translatedText = translatedText.replace(/'/g, '"');
      translatedText = JSON.parse(translatedText);

      // Set the from language to the one that was detected.
      let fromLangInput = document.getElementById("fromLanguage")
      fromLangInput.value = translatedText[0].toString();

      document.getElementById("summaryButton").disabled = false;
      // If a play button exists, enable it after recieving translation.
      if (document.getElementById("play-pause-button")) {
        let playButton = document.getElementById("play-pause-button");
        playButton.disabled = false;
      }

      // Show the translated text on the page.
      showTranslatedText(translatedText[1]);
    })
    .catch((error) => {
      return error;
    });
}

/**
 * This functions checks if the text that the user entered is valid.
 * @param {String} userInput - The text the user want to translate.
 *
 */
function isValidInput(userInput, fromLanguage, toLanguage) {
  if (isEmpty(userInput) == true) {
    alert("The text you want to translate can not be empty.");
    return false;
  }
  if (areLanguagesSame(fromLanguage, toLanguage) == true) {
    alert(
      "Please pick from language that is different from the language you want to traslate to."
    );
    return false;
  }
  if (isUserInputTheSame(userInput, fromLanguage, toLanguage) == true) {
    alert(
      "Please ensure that the text you want translated is different from your last."
    );
    return false;
  }

  return true;
}

/**
 * This function checks if text that the user entered is empty.
 * @param {String} userInput - Text that the user put in.
 * @returns {boolean} - True if the string is empty and false if not.
 */
function isEmpty(userInput) {
  if (userInput == null || userInput.trim() == "") {
    return true;
  }
  return false;
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

/**
 * 
 * @param {String} userInput 
 * @param {String} fromLanguage 
 * @param {String} toLanguage 
 * @returns 
 */
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


