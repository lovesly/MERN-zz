const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const router = express.Router();
const passport = require('passport');

// Load User model
const User = require('../../models/User');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Users works" }));

// @route GET api/users/register ? POST
// @desc Register user
// @access Public

// it's a differenct from nodejs course, when we want to post a request
// we didn't have a seqrate app.post in server
// instead, we have a router.post inside the middle ware. hmm...
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists'
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, { 
                    s: '200',
                    r: 'pg',
                    d: 'mm',
                 });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }    
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});


// @route GET api/users/login
// @desc Login user / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    // question: how to protect the password when passing it from browser to our server ? 
    // how to implement https in our project ?
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {
            errors.email = 'User not found';
            if (!user) {
                return res.status(404).json(errors);
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // User Matched
                            // 
                            const payload = { id: user.id, name: user.name, avatar: user.avatar };
                            jwt.sign(payload, keys.secretKey, { expiresIn: "1h" }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            });
                        } else {
                            errors.password = 'Password incorrect';
                            res.status(400).json(errors);
                        }
                    });
            }
        });

});


// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
    '/current', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,   
        });
    }
);


module.exports = router;