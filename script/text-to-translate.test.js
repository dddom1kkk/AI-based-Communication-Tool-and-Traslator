const isEmpty = require("./helperFunctions");
const areLanguagesSame = require("./helperFunctions");

test("Returns true when user input is empty.", () => {
    expect(isEmpty("       ")).toBe(false);
});

test("Returns false when user input is not empty", () => {
    expect(isEmpty("Hey! how are you?")).toBe(false);
})

test("Returns false when languages are different", () => {
    expect(areLanguagesSame("English", "French")).toBe(false);
});

test("Returns true when languages are same", () => {
    expect(areLanguagesSame("French", "French")).toBe(true);
});
