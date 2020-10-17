const Order = require('../models/Order')
const PromoCode = require('../models/PromoCode')
const mongoose = require('mongoose')
const { promoCodeValidator } = require('../validators/promoCode')
const { itemsValidator } = require('../validators/order')



const getUserOrders = async (req,res) => {
  const orders = await Order.find({ user: req.user._id })
  return res.status(200).send(orders)
}


const getOrders = async (req,res) => {
  let query = {}
  const { status } = req.query
  if(status){
    query.status = status
  }
  const orders = await Order.find(query)
  return res.status(200).send(orders)
}


const createOrder = async (req,res) => {
  console.log(req.body);
  const { promoCode , price } = req.body


  let getPromo = null
  if(promoCode){
    getPromo = await PromoCode.findOne({ code: promoCode, active: true })
    const promoError = await promoCodeValidator(getPromo)
    if(promoError){
      return res.status(400).send({ promoCode: promoError })
    }
  }

  let ultimatePrice = price
  if(getPromo){
    ultimatePrice = ultimatePrice - (ultimatePrice * getPromo.discount / 100)
  }


  const order = new Order({
    user: req.user._id,
    price: ultimatePrice ,
    orderId: new Date().getTime()
  })

  await order.save()
  if(getPromo){
    getPromo.used += 1
    await getPromo.save()
  }
  return res.status(201).send(order)
}

const updateOrderStatus = async (req,res) => {
  const { status } = req.body
  let error = ''
  if(!status){
    error = 'Status required.'
  }else if(!['pending','confirm','cancel'].includes(status)){
    error = 'Invalid status.'
  }
  if(error){
    return res.status(400).send({message: error })
  }

  const order = await Order.findByIdAndUpdate(req.params.id,{$set:{ status }},{ new: true})
  if(!order){
    return res.status(404).send({ message: 'Not found.'})
  }
  return res.status(200).send(order)
}

const deleteOrder = async (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).send({ message: `Invalid ID ${req.params.id}.`})
  }
  const order = await Order.findByIdAndDelete(req.params.id)
  if(!order){
    return res.status(404).send({ message: "Not found"})
  }
  return res.status(200).send(order)
}

module.exports = {
  getOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder
}
