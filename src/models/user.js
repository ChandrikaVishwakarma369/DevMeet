const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 2
    },
    lastName : {
        type : String,
        minLength : 2
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email address : ' + value )
            }
        }
    },
    password : {
        type : String,
        required : true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Password is weak : ' + value )
            }
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoURL : {
        type : String, 
        default : "https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Invalid URL : ' + value )
            }
        }   
    },
    about : {
        type : String,
        default : "this is the default value",
    },
    skills : {
        type : [String]
    }
},{ timestamps : true})

userSchema.index({fristName : 1, lastName : 1})

const User = mongoose.model('User', userSchema)

module.exports = User