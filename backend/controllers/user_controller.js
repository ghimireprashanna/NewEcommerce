const User = require('../models/Users');


exports.getUserById = async (req, res, next,id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({error: 'No user found'});
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({error: err?.message || 'No user found'});
    }
}


exports.getUser = (req, res) => {
    console.log(req.user);
    req.user.hash_password = undefined;
    return res.json(req.user);
}


exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (err) {
        return res.status(400).json({error: err?.message || 'No user found'});

    }
};

exports.adminUpdateuser = async ( req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        user.role = req.body.role;
        user.name = req.body.name;
        const updateduser = await user.save();
        res.json({ message : 'user updated successfully', user: updateduser });
    } catch (err) {
        return res.status(400).json({error: err?.message || 'No user found'});
    }
};


exports.adminDeleteuser = async ( req, res) => {
    try {
        await User.deleteOne({ _id: req.params.deleteUserId})
        res.json({ message : 'user deleated successfully' });

    } catch (err) {
        return res.status(400).json({error: err?.message || 'No user found'});
    }
};