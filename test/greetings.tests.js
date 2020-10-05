let greetingsFactoryFunction = require("../greetingsFactoryFunction.js");
let assert = require("assert");
let pg = require("pg");
let Pool = pg.Pool;
let connectionString = process.env.DATABASE_URL || 'postgresql://loreen:pg123@localhost:5432/test_greetings';
let pool = new Pool({
    connectionString
});
describe("greetingsFactoryFunction", async function() {
    beforeEach(async function() {
        await pool.query(`delete from users`)
    })


    describe("greetingsFactoryFunction", async function() {

        it("should be able to check if a name is already in the database", async function() {
            let greetFactoryFunction = greetingsFactoryFunction();
            assert.deepEqual([{ name: 'Lilli' }], await greetFactoryFunction.checkNames('Lilli'))
        });

    });

    it("should be able to insert a name in the database", async function() {
        let greetFactoryFunction = greetingsFactoryFunction();
        let storeJohn = pool.query("select name from users where name = 'John'");
        let John = storeJohn.rows;
        assert.equal(John, await greetFactoryFunction.insertNameQuery('John'))
    });




    it("should return global count", async function() {

        let greetFactoryFunction1 = greetingsFactoryFunction();
        let countQuery = await pool.query(`SELECT id FROM users`);
        let count = await countQuery.rowCount;

        assert.equal('Count is ' + count, await greetFactoryFunction1.numberOfPeopleGreeted())
    });



    it("should save a new username into the database", async function() {

        let greetFactoryFunction = greetingsFactoryFunction();
        let checkNameQuery = await pool.query("select name from users where name = 'Mandisa'");
        let checkName = checkNameQuery.rows[0];
        console.log(checkName);

        assert.equal(checkName, await greetFactoryFunction.insertNameQuery('Mandisa'));
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

    after(async function() {
        await pool.end();
    })

});