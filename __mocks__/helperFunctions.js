const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
previousFromLanguage = "English";
previousToLanguage = "French";
previousUserInput = ""
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
};

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
};

function isUserInputTheSame(userInput, fromLanguage, toLanguage) {
  if (
    userInput == previousUserInput &&
    fromLanguage == previousFromLanguage &&
    toLanguage == previousToLanguage
  ) {
    return true;
  }
  return false;
};

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

    isValid = isValidInput(userInput, fromLanguage, toLanguage)
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
function getSummarization(hasBeenSummarized,text) {
  // TODO: Check if the paragraph is more than 100 words.
  // let summaryButton = document.getElementById("summaryButton");

  if (hasBeenSummarized == false) {
    return Promise.resolve("Summarization");
  } else {
    return Promise.resolve("Has already been summarized.")
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
  return Promise.resolve("Hey comment allez-vous?")

}

async function postWithDetect(prompt) {

  // Array with first element being the detected language and second being the translation. 
  let translation = 'English, Translation' 
  return Promise.resolve(translation);
  }


/**
 * This functions checks if the text that the user entered is valid.
 * @param {String} userInput - The text the user want to translate.
 *
 */
function isValidInput(userInput, fromLanguage, toLanguage) {
  if (isEmpty(userInput) == true) {
    return ("The text you want to translate can not be empty.");
    //return false;
  }
  if (areLanguagesSame(fromLanguage, toLanguage) == true) {
    return(
      "Please pick from language that is different from the language you want to translate to."
    );
    //return false;
  }
  if (isUserInputTheSame(userInput, fromLanguage, toLanguage) == true) {
    return(
      "Please ensure that the text you want translated is different from your last."
    );
    //return false;
  }

  return true;
}

module.exports = {isEmpty, areLanguagesSame, getTranslation, getSummarization};

