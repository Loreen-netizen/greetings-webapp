let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
let GreetingsFactoryFunction = require("./greetingsFactoryFunction");

let flash = require('express-flash');
let session = require('express-session');

let pg = require("pg");
const { log } = require("handlebars");
let Pool = pg.Pool;
let connectionString = process.env.DATABASE_URL || 'postgresql://loreen:pg123@localhost:5432/projects';
let pool = new Pool({
    connectionString
});

let greetingsFactoryFunction = GreetingsFactoryFunction(pool);

app.engine('handlebars', handlebars({ layoutsDir: "./views/layouts" }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'express flash string',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



app.get("/addFlash", function(req, res) {
    try {
        req.flash('info', 'flash Message added')
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
});


app.get("/", function(req, res) {
    try {
        let name = req.body.theUserName;

        res.render("index");
    } catch (error) {
        console.log(error)
    }
});

app.post("/greet", async function(req, res) {
    try {
        let name = req.body.theUserName;
        let language = req.body.language;

        if (name === '') {
            req.flash('error', 'Please enter user name')

        } else if (language === undefined && name != '') {
            req.flash('error', 'Please select language!')

        } else {
            var greet = {
                greet: await greetingsFactoryFunction.greetLanguage(name, language),
                count: await greetingsFactoryFunction.numberOfPeopleGreeted()
            }

        }
        if (language != undefined) {
            res.render("index", {
                greet
            });
        } else { res.render("index") }

    } catch (error) {
        console.log(error)
    }
});

app.get('/greeted', async function(req, res) {
    try {
        let name = await req.body.theUserName;
        let greetedList = await greetingsFactoryFunction.getNames();
        res.render("greeted", { name: greetedList });
    } catch (error) {
        console.log(error)
    }

});

app.get('/counter/:theUserName', async function(req, res) {
    try {
        let name = req.params.theUserName;

        let userCount = await greetingsFactoryFunction.countPerName(name);

        console.log(userCount)
        let numberOfGreetings = "Hello, " + name + " has been greeted " + userCount + " times";



        res.render("counter", { list: numberOfGreetings });
    } catch (error) {
        console.log(error)
    }

});

app.get("/resetCounter", async function(req, res) {

    let reset = await greetingsFactoryFunction.resetCounter();

    try {
        res.render("index", {
            counter: reset
        });
    } catch (error) {
        console.log(error)
    }

});


app.get("/back", async function(req, res) {
    let name = await req.body.theUserName;
    let greetedList = await greetingsFactoryFunction.getNames();

    try {
        res.render("greeted", { name: greetedList });
    } catch (error) {
        console.log(error)
    }

});

app.get("/backhome", async function(req, res) {

    try {
        res.render("index");
    } catch (error) {
        console.log(error)
    }

});

let PORT = process.env.PORT || 3002;

app.listen(PORT, function() {
    console.log("App starting on port", PORT)
});