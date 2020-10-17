const mongoose = require('mongoose')
const Schema = mongoose.Schema


const orderSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref:'user',
    required: true
  },
  orderId:{
    type: String,
    required: true,
    unique: true
  },
  price:{
    type: Number,
    required: true
  },
  status:{
    type: String,
    enum: ['pending','confirm','cancel'],
    default: 'pending'
  },
  createdAt:{
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('order',orderSchema)
