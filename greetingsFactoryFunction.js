var greetingsFactoryFunction = function() {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/kitten_inn';
    const pool = new Pool({
        connectionString
    });


    var language = undefined;
    var namesGreeted = {};

    // var greet = function(name) {
    //     return "Hello " + name;
    // };

    var checkNames = function(name) {
        let allNames = `SELECT name
        FROM greet
        WHERE name = $1 [name]`

        return allNames
    };

    let insertNameQuery = async function(name) {

        "insert into greet (name, count) values ($1, 1)";
        await pool.query(insertNameQuery, [name]);

    }

    let updateCounter = function(name) {

        `UPDATE greet 
        SET count += 1
        WHERE name = $1  [name]`


    }



    var verifyNames = async function(name) {
        var theName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        var nameRows = allNames(theName)

        if (nameRows.rows === 0) {
            insertNameQuery(theName)

        } else {
            updateCounter(theName)
            return fetchCount(theName)
        };

    };



    var greetLanguage = function(name, language) {
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


    var getName = function() {

        return namesGreeted;
    };

    var numberOfPeopleGreeted = function(name) {
        let count = `SELECT count
        FROM greet
        WHERE name = [name]`
        return count
    }

    var allNamesArray = function() {
        return Object.keys(namesGreeted);
    }


    return {
        numberOfPeopleGreeted,
        greetLanguage,
        verifyNames,
        getName,
        // greet,
        allNamesArray,
        checkNames,
    }
};

module.exports = greetingsFactoryFunction;