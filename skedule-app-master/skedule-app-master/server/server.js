const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const task = require('./routes/api/task');
const news = require('./routes/api/order');


const app = express();

//body-parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys.js').mongoURI;

//Connect mongodb
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err=>console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);
app.use('/api/users', users);
app.use('/api/task',task);
app.use('/api/order', news);

const port = process.env.PORT || 6000;

app.listen(port, ()=>console.log(`Server running on port ${port}`));