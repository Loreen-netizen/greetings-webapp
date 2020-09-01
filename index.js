let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
let PORT = process.env.PORT || 3500;

app.engine('handlebars', handlebars({ layoutsDir: "./views/layouts" }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.listen(PORT, function () {
    console.log("App starting on port", PORT)
});

app.get("/", function(req,res){

    res.render("index")
});

// app.get('/', function (req, res) {
//     res.render('home');
// });

