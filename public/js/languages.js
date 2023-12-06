function createOptionsForLanguagesDropdown() {
  let rate = document.getElementById("rate");
  let rateText = document.getElementById("rate-text");

  if (rate) {
    rate.addEventListener("input", (event) => {
      rateText.innerHTML = "Speed(" + event.target.value + ")";
    });
  }

  let fromDropdown = document.getElementById("fromLanguage");
  let toDropdown = document.getElementById("toLanguage");


  for (language in languages) {

    let fullString = separateLanguageAndCode(languages[language])
    let langValue = fullString[0];
    let displayName = fullString[1];

    // Create the option for the from language.
    let newFromLanguage = createOptionElement(langValue, displayName);

    // Create the option for the to language.
    let newToLanguage = createOptionElement(langValue, displayName);

    fromDropdown.append(newFromLanguage);
    toDropdown.appendChild(newToLanguage);
  }
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

      return languageOption

}

// Runs the create options function once the DOM has loaded.
window.onload = createOptionsForLanguagesDropdown;

var languages = [
  "en-US English",
  "fr-FR French",
  "es-MX Spanish",
  "hi-IN Hindi",
  "ja-JP Japanese",
  "ar-SA Arabic",
  "cs-CZ Czech",
  "da-DK Danish",
  "de-DE German",
  "el-GR Modern Greek",
  "fi-FI Finnish",
  "he-IL Hebrew",
  "hu-HU Hungarian",
  "id-ID Indonesian",
  "it-IT Italian",
  "ko-KR Korean",
  "nl-NL Dutch",
  "no-NO Norwegian",
  "pl-PL Polish",
  "pt-BR Portuguese",
  "pt-PT Portuguese",
  "ro-RO Romanian",
  "ru-RU Russian",
  "sk-SK Slovak",
  "sv-SE Swedish",
  "th-TH Thai",
  "tr-TR Turkish",
  "zh-CN Chinese (China)",
  "zh-HK Chinese (Hong Kong)",
  "zh-TW Chinese (Taiwan)"
];

/**
 * This function sperates the code and the language and returns them as an array
 * [code, language].
 * @param {String} languageString 
 * @returns 
 */
function separateLanguageAndCode(languageString) {
  let parts = languageString.split(' ');
  let code = parts.shift(); // Remove and get the language code
  let language = parts.join(' '); // Get the remaining part as language
  return [code, language];
}