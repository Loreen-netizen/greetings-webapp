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

        let countQuery = await pool.query(`SELECT id FROM users`);

        let count = await countQuery.rowCount;
        // assert 
        assert.equal('Count is ' + count, await greetFactoryFunction.numberOfPeopleGreeted())
    });

    it("should return an object with all usernames", async function() {
        let greetFactoryFunction = GreetingsFactoryFunction(pool);
        let allNames = await greetFactoryFunction.insertNameQuery('Gigi')

        assert.deepEqual([{ name: 'Gigi' }], await greetFactoryFunction.getNames())

    });

    it("should be able to reset counter and clear database", async function() {

        // assemble
        let greetFactoryFunction = GreetingsFactoryFunction(pool);

        //act
        await greetFactoryFunction.insertNameQuery('John');
        //assert
        assert.deepEqual([], await greetFactoryFunction.resetCounter());
    });

    after(async function() {
        await pool.end();
    })

});