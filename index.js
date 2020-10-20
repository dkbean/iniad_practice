const express = require('express');
const app = express();
var bodyParser=require('body-parser');
const port = 3000;
const db= require('./db');
const userRoute= require('./routes/users.route');// routes in "/users"

app.use(express.json()) ;// for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');



app.get('/', function (req, res) {
    res.render('index.pug',{
        users1:  db.get('users1').value(),       
        num_of_users: db.get('users1').value().length // transfer value into html files
    });
});

app.use('/users',userRoute);

app.listen(3000, function () {
    console.log('Server listening on port ' + port);

});