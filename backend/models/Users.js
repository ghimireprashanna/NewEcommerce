const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dob: Date,
    phone: String,
    photo: String,
    role: {
        type: Number,
        enum: [0, 1], //0=users, 1=admin
        required: true,
        default: 0
    },
    address: {
        city: String,
        postalCode: Number,
        tole: String
    },
    hash_password: {
        type: String,
        required: true
    }

})

//this will turn plain password to hash password
userSchema.virtual('password').set(function (plainpassword) {
    const salt = bcrypt.genSaltSync()
    const hassedpass = bcrypt.hashSync(plainpassword, salt)
    this.hash_password = hassedpass
})


//this will compare if plain password is similar to hashed or not
userSchema.methods = {
    authenticate: function (plainpassword) {
        return bcrypt.compareSync(plainpassword, this.hash_password)
    }
}

module.exports = mongoose.model('User', userSchema)