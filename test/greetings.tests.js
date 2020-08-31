describe("greetingsFactoryFunction", function () {


    it("should return 1 when one person is greeted", function () {

        var greetFactoryFunction1 = greetingsFactoryFunction();
        var peopleGreeted = greetFactoryFunction1.verifyNames("Loreen")
        assert.equal(1, greetFactoryFunction1.numberOfPeopleGreeted(peopleGreeted))
    });

    it("should greet people in 3 different languages", function () {

        var greetFactoryFunction2 = greetingsFactoryFunction();

        assert.equal("Hesi Kani Yeu!", greetFactoryFunction2.greetLanguage("Yeu", "Shona"));
        assert.equal("Hello Hlosani!", greetFactoryFunction2.greetLanguage("Hlosani", "English"));
        assert.equal("Sawubona Joey!", greetFactoryFunction2.greetLanguage("Joey", "Ndebele"))
    });

    it("should push a new username into an array", function () {

        var greetFactoryFunction3 = greetingsFactoryFunction();
        assert.deepEqual(["Titi"], greetFactoryFunction3.verifyNames("Titi"))
    });

    it("should return error message if language is not selected", function () {

        var greetFactoryFunction4 = greetingsFactoryFunction();
        assert.equal("Please select language", greetFactoryFunction4.errorMessageLanguage())
    });


    it("should return an array with all usernames", function(){
        var greetFactoryFunction5 = greetingsFactoryFunction();
        assert.deepEqual([], greetFactoryFunction5.getName())
       

    });

    it("should be able to return number of people greeted", function(){
        var greetFactoryFunction6 = greetingsFactoryFunction();
        assert.equal(0, greetFactoryFunction6.numberOfPeopleGreeted())
       

    });
   

    it("should return error message when user name has not been entered", function(){
        var greetFactoryFunction7 = greetingsFactoryFunction();
       
        assert.equal("Please enter userName", greetFactoryFunction7.errorMessageUserName(""))
       

    });
   

});
