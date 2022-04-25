const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 2000;


// parsing middleware:
// parse application..urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Parse application/ json
app.use(bodyParser.json());

// static files
// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

// Templating Engine
// Connection Pool


app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
// //Router
// app.get('/', (req, res)=> {
//     res.sendFile( __dirname + '/views/layouts/home.html')
// });

const routes = require('./server/routes/user')
app.use('/', routes)

app.listen(port, () => console.log(`listening on port ${port}`));