const express = require('express');
const app = express();
var bodyParser=require('body-parser');
const port = 3000;

const userRoute= require('./routes/users.route');// routes in "/users"

app.use(express.json()) ;// for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index.pug',{
        friends: 01,
        name : 'Vinh',
        age: 18,
        a: [1,2,3],
    });
});

app.use('/users',userRoute);

app.listen(3000, function () {
    console.log('Server listening on port ' + port);

});