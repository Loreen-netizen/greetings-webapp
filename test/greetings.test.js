let GreetingsFactoryFunction = require("../greetingsFactoryFunction.js");
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
            // assemble
            let greetFactoryFunction = GreetingsFactoryFunction(pool);
            //act
            await greetFactoryFunction.insertNameQuery("Lilli");
            // assert
            assert.deepEqual([{ name: 'Lilli' }], await greetFactoryFunction.checkNames('Lilli'))
        });

    });

    it("should be able to insert a name in the database", async function() {

        // assemble
        let greetFactoryFunction = GreetingsFactoryFunction(pool);

        //act
        await greetFactoryFunction.insertNameQuery('John');

        // assert

        assert.deepEqual([{ name: 'John' }], await greetFactoryFunction.checkNames('John'));


    });

    it("should be able to greet a person in selected language", async function() {
        let greetFactoryFunction = GreetingsFactoryFunction(pool);

        assert.equal("Hesi Kani John!", await greetFactoryFunction.greetLanguage('John', 'Shona'))
    });




    it("should return global count", async function() {

        let greetFactoryFunction = GreetingsFactoryFunction(pool);

        // assert that greetFactoryFunction1 is what it should be...

        let countQuery = await pool.query(`SELECT id FROM users`);
        let count = await countQuery.rowCount;

        // assert.equal('Count is ' + count, await greetFactoryFunction1.numberOfPeopleGreeted())
    });



    it("should save a new username into the database", async function() {

        let greetFactoryFunction = GreetingsFactoryFunction(pool);
        let checkNameQuery = await pool.query("select name from users where name = 'Mandisa'");
        let checkName = checkNameQuery.rows[0];
        console.log(checkName);

        assert.equal(checkName, await greetFactoryFunction.insertNameQuery('Mandisa'));
    });



    it("should return an object with all usernames", async function() {
        let greetFactoryFunction = GreetingsFactoryFunction(pool);
        let allNames = await pool.query(`SELECT name FROM users`)
        names = allNames.rows

        assert.deepEqual(names, await greetFactoryFunction.getNames())


    });



    after(async function() {
        await pool.end();
    })

});