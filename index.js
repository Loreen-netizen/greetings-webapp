let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
let GreetingsFactoryFunction = require("./greetingsFactoryFunction");
let greetingsFactoryFunction = GreetingsFactoryFunction();

app.engine('handlebars', handlebars({ layoutsDir: "./views/layouts" }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get("/", function (req, res) {

    let name = req.body.theUserName;

    res.render("index");
});

app.post("/greet", function (req, res) {
    let name = req.body.theUserName;
    let language = req.body.language;
    res.render("index",
        {
            greet: greetingsFactoryFunction.greetLanguage(name, language)
        })

});

app.get('/greeted', function (req, res) {

    let name = req.body.theUserName;
    let greetedList = Object.keys(greetingsFactoryFunction.getName());
    res.render("greeted", { name: greetedList}); 

});

 app.get('/counter/:theUserName',function (req,res){
let name = req.params.theUserName;
// greetingsFactoryFunction.verifyNames(name);
let namesObject = greetingsFactoryFunction.getName();

let numberOfGreetings = name + " have be" + namesObject[name];

 

     res.render("counter",{ list : numberOfGreetings}
     );
 });

let PORT = process.env.PORT || 3500;

app.listen(PORT, function () {
    console.log("App starting on port", PORT)
});




