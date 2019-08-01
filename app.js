const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const app = express();


// Passport Config
require('./config/passport')(passport);



// Border parser
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//DB Config
const db = require('./config/keys').MongoURI;

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true})
            .then(()=> console.log("MongoDb connected..."))
            .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
 

