var greetingsFactoryFunction = function () {
    var language = undefined;
    var namesGreeted = {};
    // var counter = 0;

    var greet = function (name) {
        return "Hello " + name;
    };
    var verifyNames = function (name) {
        if (name) {
        
            var theName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
 
            if (namesGreeted[theName] === undefined) {
                namesGreeted[theName] = 1;
            }
            else {
                 namesGreeted[theName]++ 
            };
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
        return Object.keys(namesGreeted).length;
    }

    var allNamesArray = function(){
        return Object.keys(namesGreeted);
    }
    

    return {
        numberOfPeopleGreeted,
        greetLanguage,
        verifyNames,
        errorMessageLanguage,
        errorMessageUserName,
        getName,
        greet,
        allNamesArray,
    }
};

module.exports = greetingsFactoryFunction;
