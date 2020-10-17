const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promoCodeSchema = new Schema({
  code:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: 55
  },
  maxUse:{
    type: Number,
    required: false
  },
  used:{
    type: Number,
    default: 0
  },
  deadline:{
    type: Date,
    required: true
  },
  discount:{
    type: Number,
    required: true
  },
  active:{
    type: Boolean,
    default: false
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('promocode',promoCodeSchema)
