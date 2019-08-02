const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const db = require('../config/keys').MongoURI;

//User Model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res)=> res.send('Login'));

// Register Page
router.get('/register', (req, res)=> res.send('Register'));


//Register Handle
router.post('/register', (req, res)=>{
    const { name, email, password, password2} = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all the fields'});
        
    }

    //Check passwords match
    if(password != password2){
        errors.push({msg: 'Passwords dont match'});
        
    }

    //Check password length
    if(password.length < 6){
        errors.push({msg: 'Password should be atleast 6 characters'});
        
        
    }

    if(errors.length>0){

    }else{
        User.findOne({email: email})
            .then(user=>{
                if(user){
                    //user exists
                    errors.push({msg: 'email is already registered'})
                    res.send({message:'email is already registered'});
                }
                try{
                    else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    // Hash password
                    bcrypt.genSalt(10, (err, salt)=> 
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;
                        
                        // set password to hash
                        newUser.password = hash;

                        //save user
                        newUser.save()
                            .then()
                            .catch(err => console.log(err));
                    }))

                    res.send({message:'Welcome!'})
                }
                }
                catch(error) {

                    res.send("Internal server Error").send(error);

                }
            });
    }
});

//Login handle
router.post('/login',async (req, res)=>{
    const {email, password} = req.body;
    let errors = [];

    //Check required fields
    if(!email || !password){
        errors.push({msg: 'Please fill in all the fields'});
        res.send({message:'Please fill in all the fields'});
    }

    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if(!user) {
            return res.send({message:"Email not registered"});
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.send({message:"Password Invalid"});        
        }
        res.send({ message: "Successful" });
    } 
    catch (error) {
        res.send("Internal server Error").send(error);
    }

});

// Logout Page
router.get('/logout', (req, res)=> {
    req.logout();
    res.send('Logged out successfully');
});

//Update the email
router.put('/update/:id', (req, res, next) => {
    const id = req.params.id;

    User.findById(id)
        .then(user=>{
            user.email = req.body.email;
            user.save()
            .then(user => {
                res.send({message: 'Details updated successfully'})
            })
            .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
 });


module.exports = router;