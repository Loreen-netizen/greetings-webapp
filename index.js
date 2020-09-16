let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
let GreetingsFactoryFunction = require("./greetingsFactoryFunction");
let greetingsFactoryFunction = GreetingsFactoryFunction();
let flash = require('express-flash');
let session = require('express-session');

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

        console.log(req.body.language);

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

        let globalCounter = "Count is " + await greetingsFactoryFunction.numberOfPeopleGreeted()

        res.render("index", {
            greet

        });
    } catch (error) {
        console.log(error)
    }
});

app.get('/greeted', function(req, res) {
    try {
        let name = req.body.theUserName;
        let greetedList = Object.keys(greetingsFactoryFunction.getName());
        res.render("greeted", { name: greetedList });
    } catch (error) {
        console.log(error)
    }

});

app.get('/counter/:theUserName', function(req, res) {
    try {
        let name = req.params.theUserName;

        let namesObject = greetingsFactoryFunction.getName();

        let numberOfGreetings = "Hello, " + name + " has been greeted " + namesObject[name] + " times";



        res.render("counter", { list: numberOfGreetings });
    } catch (error) {
        console.log(error)
    }

});

let PORT = process.env.PORT || 3500;

app.listen(PORT, function() {
    console.log("App starting on port", PORT)
});