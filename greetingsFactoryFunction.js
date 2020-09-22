var greetingsFactoryFunction = function() {

    var language = undefined;
    let pg = require("pg");
    let Pool = pg.Pool;

    var checkNames = async function(name) {
        let isName = await pool.query(`SELECT name
        FROM users
        WHERE name = $1`, [name])
        return isName
    };

    let insertNameQuery = async function(name) {
        let insertQuery =
            "insert into users (name, counter) values ($1, 1)";
        await pool.query(insertQuery, [name]);

    }

    let updateCounter = async function(name) {

        await pool.query(`UPDATE users
        SET counter = counter + 1
        WHERE name = $1 `, [name])
    }



    var verifyNames = async function(name) {
        var theName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        var nameRows = await checkNames(theName)
        if (nameRows.rowCount === 0) {
            await insertNameQuery(theName)

        } else {
            await updateCounter(theName)

        };
    };



    var greetLanguage = async function(name, language) {
        var caseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        await verifyNames(caseName);
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


    var getNames = async function() {

        let allNames = await pool.query(`SELECT name FROM users`)
        return allNames.rows;
    };

    var countPerName = async function(name) {

        var caseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        let countPerUser = await pool.query(`SELECT counter
        FROM users
        WHERE name = $1`, [caseName]);

        if (countPerUser.rows.length > 0) {
            return (countPerUser.rows[0].counter)
        } else {
            console.log("namenotgreeted")
        }
    };

    var numberOfPeopleGreeted = async function() {
        let count = await pool.query(`SELECT id FROM users`)
        return "Count is " + count.rowCount
    }


    return {
        numberOfPeopleGreeted,
        greetLanguage,
        verifyNames,
        getNames,
        checkNames,
        countPerName,
    }
};

module.exports = greetingsFactoryFunction;