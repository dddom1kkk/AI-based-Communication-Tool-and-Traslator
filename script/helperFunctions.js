/**
 * This function checks if text that the user entered is empty. 
 * @param {String} userInput - Text that the user put in.
 * @returns {boolean} - True if the string is empty and false if not. 
 */
const isEmpty = (userInput) =>{
  if (userInput == null || userInput.trim() == "") {
    return true;
  }else {
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
  const areLanguagesSame = (fromLanguage, toLanguage) =>{
    if (fromLanguage == toLanguage){
      return true;
    }
    return false;
  
  }
  
  const isUserInputTheSame = (userInput, fromLanguage, toLanguage) => {
if (userInput == previousUserInput && fromLanguage == previousFromLanguage && 
      toLanguage == previousToLanguage) {
      return true
    }
    return false;
  }

  module.exports = isEmpty;
  module.exports = isUserInputTheSame;
  module.exports = areLanguagesSame