let greetingsFactoryFunction = require("../greetingsFactoryFunction.js");
let assert = require("assert");
let pg = require("pg");
let Pool = pg.Pool;
let connectionString = process.env.DATABASE_URL || 'postgresql://loreen:pg123@localhost:5432/test_greetings';
let pool = new Pool({
    connectionString
});
describe("greetingsFactoryFunction", function() {

    it("should be able to check if a name is already in the database", async function() {
        let greetFactoryFunction1 = greetingsFactoryFunction();
        let results = await pool.query(greetFactoryFunction1.checkNames("Lilli"));

        assert.equal("Lilli", results)
    });

});


it("should return 1 when one person is greeted", async function() {

    let greetFactoryFunction1 = greetingsFactoryFunction();
    let peopleGreeted = greetFactoryFunction1.verifyNames("Loreen")
    assert.equal(1, await greetFactoryFunction1.numberOfPeopleGreeted(peopleGreeted))
});



it("should push a new username into an array", async function() {

    let greetFactoryFunction = greetingsFactoryFunction();
    greetFactoryFunction.verifyNames("Titi");
    assert.deepEqual(["Titi"], await greetFactoryFunction.allNamesArray());
});

// it("should return error message if language is not selected", function () {

//     let greetFactoryFunction4 = greetingsFactoryFunction();
//     assert.equal("Please select language", greetFactoryFunction4.errorMessageLanguage())
// });


it("should return an array with all usernames", async function() {
    let greetFactoryFunction5 = greetingsFactoryFunction();
    await greetFactoryFunction5.verifyNames('');
    assert.deepEqual([], await greetFactoryFunction5.allNamesArray())


});

it("should be able to return number of people greeted", async function() {
    let greetFactoryFunction6 = greetingsFactoryFunction();
    assert.equal(0, await greetFactoryFunction6.numberOfPeopleGreeted())


});


it("should return error message when user name has not been entered", async function() {
    let greetFactoryFunction7 = greetingsFactoryFunction();

    assert.equal("Please enter userName", await greetFactoryFunction7.errorMessageUserName(""))


});