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
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(session({
    secret: 'my secret string Yeu',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.get("/addFlash", function (req, res) {
    req.flash('info', 'flash Message added')
    res.redirect('/')
});


app.get("/", function (req, res) {

    let name = req.body.theUserName;

    res.render("index");
});

app.post("/greet", function (req, res) {
    let name = req.body.theUserName;
    let language = req.body.language;
    let globalCounter = "Count is " + greetingsFactoryFunction.numberOfPeopleGreeted()
    console.log(req.body.language);

    if (name === '' && language === undefined) {
        req.flash('error', 'Please enter name and select language!')
    }
    else if (language  === undefined) {
        req.flash('error', 'Please enter user name!')

    }
    else if (name === '') {
        req.flash('error', 'Please enter user name and language!')

    }
    else {
        greetingsFactoryFunction.greetLanguage(name, language)
    }
    res.render("index",
        {
            greet: greetingsFactoryFunction.greetLanguage(name, language) ,
            count: globalCounter

        });
});

app.get('/greeted', function (req, res) {

    let name = req.body.theUserName;
    let greetedList = Object.keys(greetingsFactoryFunction.getName());
    res.render("greeted", { name: greetedList });

});

app.get('/counter/:theUserName', function (req, res) {
    let name = req.params.theUserName;

    let namesObject = greetingsFactoryFunction.getName();

    let numberOfGreetings = "Hello, " + name + " has been greeted " + namesObject[name] + " times";



    res.render("counter", { list: numberOfGreetings }
    );
});

let PORT = process.env.PORT || 3500;

app.listen(PORT, function () {
    console.log("App starting on port", PORT)
});




