const PromoCode = require('../models/PromoCode')
const { createValidator, promoCodeValidator } = require('../validators/promoCode')
const mongoose = require('mongoose')


const getPromoCodes = async (req,res) => {
  const { active } = req.query
  const query = {}
  if(active && active === 'active'){
    query.active = true
  }else if(active && active === 'unactive'){
    query.active = false
  }
  const promos = await PromoCode.find(query)
  return res.status(200).send(promos)
}

const getPromoCode = async (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).send({ message: `Invalid ID ${req.params.id}.`})
  }
  const promo = await PromoCode.findById(req.params.id)
  if(!promo){
    return res.status(404).send({ message: 'Not found.'})
  }

  return res.status(200).send(promo)
}

const applyPromoCode = async (req,res) => {
  const promoCode = await PromoCode.findOne({ code: req.body.promoCode, active: true })
  const promoError = await promoCodeValidator(promoCode)
  if(promoError){
    return res.status(400).send({ promoCode: promoError })
  }
  return res.status(200).send(promoCode)
}

const createPromoCode = async (req,res) => {
  // Error validations
  const { errors, isValid } = createValidator(req.body)
  if(!isValid){
    return res.status(400).send(errors)
  }

  const { code, maxUse, deadline, discount, active } = req.body // distruct request body

  // Create promo code ...
  const promoCode = new PromoCode({
    code,
    maxUse: Number(maxUse),
    deadline: new Date(deadline),
    discount: Number(discount),
    active: typeof active === 'boolean' ? active: false
  })
  await promoCode.save()
  return res.status(201).send(promoCode)
}

const updatePromoCode = async (req,res) => {
  const promoCode = await PromoCode.findById(req.params.id)
  if(!promoCode){
    return res.status(404).send({ message: 'Not found.'})
  }

  // Error checking ...
  const { errors, isValid } = createValidator(req.body)
  if(!isValid){
    return res.status(400).send(errors)
  }

  const { code, maxUse, deadline, discount, active } = req.body // distruct request body

  if(promoCode.code !== code){
    const exists = await PromoCode.findOne({ code })
    if(exists){
      return res.status(400).send({ code: "Code already exists."})
    }
  }

  promoCode.code = code
  promoCode.maxUse = Number(maxUse),
  promoCode.deadline = new Date(deadline),
  promoCode.discount = Number(discount),
  promoCode.active = typeof active === 'boolean' ? active: false
  await promoCode.save()
  return res.status(200).send(promoCode)
}


module.exports = {
  createPromoCode,
  updatePromoCode,
  getPromoCodes,
  getPromoCode,
  applyPromoCode
}
