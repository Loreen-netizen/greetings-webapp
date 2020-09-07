let greetingsFactoryFunction = require("../greetingsFactoryFunction.js");
let assert = require("assert");
describe("greetingsFactoryFunction", function () {
    
    it("should greet Yeu", function () {

        let greetFactoryFunction = greetingsFactoryFunction();
        assert.equal("Hello Yeu", greetFactoryFunction.greet("Yeu"))
    });

    it("should return 1 when one person is greeted", function () {

        let greetFactoryFunction1 = greetingsFactoryFunction();
        let peopleGreeted = greetFactoryFunction1.verifyNames("Loreen")
        assert.equal(1, greetFactoryFunction1.numberOfPeopleGreeted(peopleGreeted))
    });

    it("should greet people in 3 different languages", function () {

        let greetFactoryFunction2 = greetingsFactoryFunction();

        assert.equal("Hesi Kani Yeu!", greetFactoryFunction2.greetLanguage("Yeu", "Shona"));
        assert.equal("Hello Hlosani!", greetFactoryFunction2.greetLanguage("Hlosani", "English"));
        assert.equal("Sawubona Joey!", greetFactoryFunction2.greetLanguage("Joey", "Ndebele"))
    });

    it("should push a new username into an array", function () {

        let greetFactoryFunction = greetingsFactoryFunction();
        let greetTiti = greetFactoryFunction.verifyNames("Titi");
        assert.deepEqual(["Titi"], greetFactoryFunction.allNamesArray(greetTiti));
    });

    it("should return error message if language is not selected", function () {

        let greetFactoryFunction4 = greetingsFactoryFunction();
        assert.equal("Please select language", greetFactoryFunction4.errorMessageLanguage())
    });


    it("should return an array with all usernames", function(){
        let greetFactoryFunction5 = greetingsFactoryFunction();
        assert.deepEqual([], greetFactoryFunction5.getName())
       

    });

    it("should be able to return number of people greeted", function(){
        let greetFactoryFunction6 = greetingsFactoryFunction();
        assert.equal(0, greetFactoryFunction6.numberOfPeopleGreeted())
       

    });
   

    it("should return error message when user name has not been entered", function(){
        let greetFactoryFunction7 = greetingsFactoryFunction();
       
        assert.equal("Please enter userName", greetFactoryFunction7.errorMessageUserName(""))
       

    });
   

});
