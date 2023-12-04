function createOptionsForSpeechLanguagesDropdown() {
    let rate = document.getElementById("rate");
    let rateText = document.getElementById("rate-text");
  
    if (rate) {
        rate.addEventListener("input", (event) => {
            rateText.innerHTML = "Speed " + event.target.value + "x :";
        });
    }
  
    let fromDropdown = document.getElementById("fromLanguage");
    let toDropdown = document.getElementById("toLanguage");
  
    for (let language of speechLanguages) {
        let [langValue, displayName] = separateLanguageAndCode(language);
  
        // Create the option for the language dropdown.
        let newLanguageOption = document.createElement("option");
        newLanguageOption.value = langValue;
        newLanguageOption.innerHTML = displayName;
        fromDropdown.append(newLanguageOption);
    }

    for (let language of languages) {
        let [langValue, displayName] = separateLanguageAndCode(language);

        // Create the option for the to language.
        let newToLanguage = document.createElement("option");
        newToLanguage.value = langValue;
        newToLanguage.innerHTML = displayName;
        toDropdown.append(newToLanguage);
    }
  }
  
  window.onload = createOptionsForSpeechLanguagesDropdown;
  
  var speechLanguages = [
    "en-US_BroadbandModel English (United States)",
    "en-AU_BroadbandModel English (Australian)",
    "en-GB_BroadbandModel English (United Kingdom)",
    "es-AR_BroadbandModel Spanish (Argentina)",
    "ar-AR_BroadbandModel Arabic (Modern Standard)",
    "de-DE_BroadbandModel German (Germany)",
    "es-CL_BroadbandModel Spanish (Chile)",
    "es-CO_BroadbandModel Spanish (Colombia)",
    "es-ES_BroadbandModel Spanish (Spain)",
    "es-MX_BroadbandModel Spanish (Mexico)",
    "es-PE_BroadbandModel Spanish (Peru)",
    "fr-CA_BroadbandModel French (Canada)",
    "fr-FR_BroadbandModel French (France)",
    "it-IT_BroadbandModel Italian (Italy)",
    "ja-JP_BroadbandModel Japanese (Japan)",
    "ko-KR_BroadbandModel Korean (South Korea)",
    "nl-NL_BroadbandModel Dutch (Netherlands)",
    "pt-BR_BroadbandModel Portuguese (Brazil)",
    "zh-CN_BroadbandModel Chinese (Mandarin, Simplified)",
    "pt-PT_BroadbandModel Portuguese (Portugal)",
    // add other models as needed
  ];

  var languages = [
    "en-US_AllisonV3Voice English (United States, Allison)",
    "en-US_EmilyV3Voice English (United States, Emily)",
    "en-US_HenryV3Voice English (United States, Henry)",
    "en-US_KevinV3Voice English (United States, Kevin)",
    "en-US_LisaV3Voice English (United States, Lisa)",
    "en-US_MichaelV3Voice English (United States, Michael)",
    "en-US_OliviaV3Voice English (United States, Olivia)",
    "en-AU_CraigVoice English (Australian, Craig)",
    "en-AU_MadisonVoice English (Australian, Madison)",
    "en-GB_CharlotteV3Voice English (United Kingdom, Charlotte)",
    "en-GB_JamesV3Voice English (United Kingdom, James)",
    "en-GB_KateV3Voice English (United Kingdom, Kate)",
    "ar-MS_OmarVoice Arabic (Modern Standard)",
    "de-DE_BirgitV3Voice German (Germany, Birgit)",
    "de-DE_DieterV3Voice German (Germany, Dieter)",
    "de-DE_ErikaV3Voice German (Germany, Erika)",
    "es-ES_EnriqueV3Voice Spanish (Spain, Enrique)",
    "es-ES_LauraV3Voice Spanish (Spain, Laura)",
    "es-LA_SofiaV3Voice Spanish (Latin American)",
    "es-US_SofiaVoice Spanish (United States)",
    "fr-CA_LouiseV3Voice French (Canadian)",
    "fr-FR_NicolasV3Voice French (France, Nicolas)",
    "fr-FR_ReneeV3Voice French (France, Renee)",
    "it-IT_FrancescaV3Voice Italian (Italy)",
    "ja-JP_EmiV3Voice Japanese (Japan)",
    "ko-KR_YoungmiVoice Korean (South Korea, Youngmi)",
    "ko-KR_YunaVoice Korean (South Korea, Yuna)",
    "nl-NL_EmmaVoice Dutch (Netherlands, Emma)",
    "nl-NL_LiamVoice Dutch (Netherlands, Liam)",
    "pt-BR_IsabelaV3Voice Portuguese (Brazil)",
    "zh-CN_LiNaVoice Chinese (Mandarin, LiNa)",
    "zh-CN_WangWeiVoice Chinese (Mandarin, WangWei)",
    "zh-CN_ZhangJingVoice Chinese (Mandarin, ZhangJing)",
    // add other voices as needed
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