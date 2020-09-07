var greetingsFactoryFunction = function (names) {
    var language = undefined;
    var namesGreeted = names || {};
    var counter = 0;

    var greet = function (name) {
        return "Hello " + name;
    };
    var verifyNames = function (name) {
        if (name === undefined) {
            return;
        }
        else {
            var theName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

            if (theName) {
                return namesGreeted.theName = 1;
            }
            else { return namesGreeted.theName = counter++ };
        }

    };

    var greetLanguage = function (name, language) {
        var caseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        verifyNames(caseName);
        if (language === "Shona") {
            return ("Hesi Kani " + caseName + "!")
        }
        if (language === "Ndebele") {
            return ("Sawubona " + caseName + "!")
        }
        if (language === "English") {
            return ("Hello " + caseName + "!")
        }
        else if (language === undefined || language === null) {
            return "Please select language!"
        }
    }


    var errorMessageLanguage = function () {
        if (language === null || language === undefined) {
            return "Please select language"
        }

    };

    var getName = function () {

        return namesGreeted;
    };

    var errorMessageUserName = function (name) {
        if (name === "") {
            return "Please enter userName"
        }
    }

    var numberOfPeopleGreeted = function () {
        let allGreeted = [];
        for(let property in namesGreeted){
            allGreeted.push(property);
        }
        return allGreeted.length;
    }

    return {
        numberOfPeopleGreeted,
        greetLanguage,
        verifyNames,
        errorMessageLanguage,
        errorMessageUserName,
        getName,
        greet,
    }
};

module.exports = greetingsFactoryFunction;
