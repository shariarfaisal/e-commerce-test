const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const adminSchema = new Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: 55
  },
  password:{
    type: String,
    required: true
  }
})

adminSchema.methods.getToken = function(){
  return jwt.sign({ _id: this._id, type: 'admin' },process.env.SECRET_KEY)
}

module.exports = mongoose.model('admin',adminSchema)
