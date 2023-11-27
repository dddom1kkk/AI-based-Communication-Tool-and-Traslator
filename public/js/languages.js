function createOptionsForLanguagesDropdown(){

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
