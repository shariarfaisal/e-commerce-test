const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
    trim: true,
    max:55
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

userSchema.methods.getToken = function(){
  return jwt.sign({ _id: this._id, type: 'user' },process.env.SECRET_KEY)
}


module.exports = mongoose.model('user',userSchema)
