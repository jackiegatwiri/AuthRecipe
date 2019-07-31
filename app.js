const express = require('express');
const mongoose = require('mongoose');

const app = express();



// Border parser
app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

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
 

