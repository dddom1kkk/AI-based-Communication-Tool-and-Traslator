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
    let langValue = languages[language];

    // Create the option for the from language.
    let newFromLanguage = document.createElement("option");
    newFromLanguage.value = langValue;
    newFromLanguage.innerHTML = langValue;

    // Create the option for the to language.
    let newToLanguage = document.createElement("option");
    newToLanguage.value = langValue;
    newToLanguage.innerHTML = langValue;

    fromDropdown.append(newFromLanguage);
    toDropdown.appendChild(newToLanguage);
  }
}

// Runs the create options function once the DOM has loaded.
window.onload = createOptionsForLanguagesDropdown;

var languages = [
  "English",
  "French",
  "Punjabi",
  "Afrikaans",
  "Albanian",
  "Arabic",
  "Armenian",
  "Assamese",
  "Azerbaijani",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bosnian",
  "Bulgarian",
  "Burmese",
  "Catalan",
  "Chinese",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "Estonian",
  "Farsi",
  "Filipino",
  "Finnish",
  "Galician",
  "Georgian",
  "German",
  "Greek",
  "Gujarati",
  "Haitian Creole",
  "Hausa",
  "Hebrew",
  "Hindi",
  "Hmong",
  "Hungarian",
  "Icelandic",
  "Igbo",
  "Indonesian",
  "Irish",
  "Italian",
  "Japanese",
  "Javanese",
  "Kannada",
  "Kazakh",
  "Khmer",
  "Kinyarwanda",
  "Korean",
  "Kurdish",
  "Kyrgyz",
  "Lao",
  "Latvian",
  "Lithuanian",
  "Luxembourgish",
  "Macedonian",
  "Malagasy",
  "Malay",
  "Malayalam",
  "Maltese",
  "Maori",
  "Marathi",
  "Mongolian",
  "Nepali",
  "Norwegian",
  "Oriya",
  "Oromo",
  "Pashto",
  "Persian",
  "Polish",
  "Portuguese",
  "Romanian",
  "Russian",
  "Samoan",
  "Scots Gaelic",
  "Serbian",
  "Sesotho",
  "Shona",
  "Sindhi",
  "Sinhala",
  "Somali",
  "Spanish",
  "Sundanese",
  "Swahili",
  "Swedish",
  "Tagalog",
  "Tajik",
  "Tamil",
  "Tatar",
  "Telugu",
  "Thai",
  "Tigrinya",
  "Tongan",
  "Turkish",
  "Ukrainian",
  "Urdu",
  "Uzbek",
  "Vietnamese",
  "Welsh",
];

function createOptionsForLanguagesDropdown() {
  [
    "en-English",
    "fr-French",
    "es-Spanish",
    "hi-Hindi",
    "ar-Arabic",
    "cs-Czech",
    "da-Danish",
    "de-German",
    "el-Greek",
    "eo-Esperanto",
    "et-Estonian",
    "fi-Finnish",
    "he-Hebrew",
    "hu-Hungarian",
    "id-Indonesian",
    "it-Italian",
    "ja-Japanese",
    "ko-Korean",
    "la-Latin",
    "lt-Lithuanian",
    "lv-Latvian",
    "nb-Norwegian Bokmal",
    "nl-Dutch",
    "nn-Norwegian Nynorsk",
    "no-Norwegian",
    "pl-Polish",
    "pt-Portuguese",
    "ro-Romanian",
    "ru-Russian",
    "sk-Slovak",
    "sl-Slovenian",
    "sq-Albanian",
    "sr-Serbian",
    "sv-Swedish",
    "th-Thai",
    "tr-Turkish",
    "zh-Chinese",
  ];
}


