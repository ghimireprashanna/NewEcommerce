const User = require('../models/Users.js');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const  { expressjwt } = require('express-jwt');

exports.signup = async (req, res,) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
try {
    const user= new User(req.body);
    const createdUser = await user.save();
    res.json({message: 'Signup successful', _id: createdUser._id});

} catch (err) {
    console.log(err);
    return res
    .status(400)
    .json({message: err.message || 'Not Able to save in Database'});
}
};

exports.login = async (req, res,) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
try {
    const {email, password} =req.body;
    const user = await User.findOne({email}).exec()
    if (!user) {
        return res.status(400).json({error: 'User not found'});
    }
    if(!user.authenticate(password)){
        return res.status(400).json({ error:'Email or password invalid'});
    }

    //JWT generate
    const token = jwt.sign({
        _id: user._id,
        exp: Math.floor(Date.now() / 1000) + 864000
    },process.env.SECRET)

    user.hash_password = undefined;
    res.json({message:'Login successful', token, user})

} catch (err) {
    console.log(err);
    return res
    .status(400)
    .json({message: err.message || 'Not Able to save in Database'});
}
};

//yesle chai authenticated user ho vanerea vanxa
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    requestProperty: 'auth',
    algorithms: ["HS256"]
    

})


exports.isAuthenticated =(req, res, next) => {
    console.log(req.auth)
    console.log(req.user)

    let checker = req.auth && req.user && req.auth._id == req.user._id
    if (!checker) {
        return res.status(403).json({
            error: 'Authentication access denied',
        });
    }
    next()
}

exports.isAdmin =(req, res, next) => {
    if(req.user.role == 1) {
        next();
    } else{
        return res.status(403).json({
            error:'Admin access denied'
        });
    }
}
