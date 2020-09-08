var greetingsFactoryFunction = function () {
    var language = undefined;
    var namesGreeted = {};

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
        if (language === "Shona" && name != "") {
            return ("Hesi Kani " + caseName + "!")
        }
        if (language === "Ndebele" && name != "") {
            return ("Sawubona " + caseName + "!")
        }
        if (language === "English" && name != "") {
            return ("Hello " + caseName + "!")
        }

    };


    var getName = function () {

        return namesGreeted;
    };

    var numberOfPeopleGreeted = function () {
        return Object.keys(namesGreeted).length;
    }

    var allNamesArray = function () {
        return Object.keys(namesGreeted);
    }


    return {
        numberOfPeopleGreeted,
        greetLanguage,
        verifyNames,
        getName,
        greet,
        allNamesArray,
    }
};

module.exports = greetingsFactoryFunction;
