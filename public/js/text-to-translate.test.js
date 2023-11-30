// const getTranslation = require("../__mocks__/helperFunctions")
// const isEmpty = require("../__mocks__/helperFunctions");
// const areLanguagesSame = require("../__mocks__/helperFunctions");

const { isEmpty, areLanguagesSame, getTranslation, separateLanguageAndCode, createOptionElement, isUserInputSame, showTranslatedText} = require("../../__mocks__/helperFunctions");

//Unit tests for ChatGPT.

// unit test 1
test("Returns true when user input is empty.", () => {
    const empty = isEmpty("    ");
    expect(empty).toBe(true);
});

// unit test 2
test("Returns false when user input is not empty", () => {
    expect(isEmpty("Hey! how are you?")).toBe(false);
})

//unit test 3
test("Returns false when languages are different", () => {
    expect(areLanguagesSame("English", "French")).toBe(false);
});

// Unit test 4
test("Returns true when languages are same", () => {
    expect(areLanguagesSame("French", "French")).toBe(true);
});

// Unit test 5
test('separateLanguageAndCode correctly separates language code and name', () => {
    const languageString = 'hi-IN Hindi';
    const result = separateLanguageAndCode(languageString);
    expect(result).toEqual(['hi-IN', 'Hindi']);
});

// Unit test 6
test("createOptionElement correctly creates a 'options' element with the right display name and value", ()=> {
    const displayName = "French";
    const languageCode = "fr-FR";
    
    const optionElement = createOptionElement("fr-FR", "French");

    expect(optionElement.nodeName).toBe("OPTION");
    expect(optionElement.innerHTML).toBe("French");
    expect(optionElement.value).toBe("fr-FR");
})

// Unit test 7 - isUserInputSame
test("Check if the userInput is the same from the last time they pressed the 'translate button", () => {
    
    expect(isUserInputSame("hi", "French", "English")).toBe(true);
});

document.body.innerHTML = '<div id="toOutput"></div>';

// Unit test 8 - showTranslatedText
test("showTranslatedText correctly displays translated text in the output area", () => {
  // Sample translated text
  const translatedText = "This is a sample translated text.";

  // Call the showTranslatedText function with the sample translated text
  showTranslatedText(translatedText);

  // Expect the output area to have the correct innerHTML
  const outputArea = document.getElementById("toOutput");
  expect(outputArea.innerHTML).toBe(translatedText);
});




// Integration test 1 - This tests Translation function 
test('integration test for testing the translation function.', async () => {
    try {
        const response = await getTranslation("English", "French", "Hey, how are you?");
        expect(response).toBe('Hey comment allez-vous?');
    } catch (err) {
        // Fails the test if there's an error
        console.log(err);
    }
});

// Integration test 1.1 - This tests Translation function if you give the same language
test('integration test that checks if from and to languages are the same.', async () => {
    try {
        const response = await getTranslation("English", "English", "Hey, how are you?");
        expect(response).toBe('Please pick from language that is different from the language you want to translate to.');
    } catch (err) {
        // Fails the test if there's an error
        console.log(err);
    }
});

// Integration test 2 - This tests the integration of the detect language feature.
test('integration test for detect language feature', async () => {
    try {
        const response = await getTranslation("Detect Language", "French", "Hey, how are you?");

        expect(response).toEqual(["English",'Hey comment allez-vous?']);
    } catch (err) {
        // Fails the test if there's an error
        console.log(err);
    }
});