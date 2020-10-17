const Router = require('express').Router()
const {
  createPromoCode,
  updatePromoCode,
  getPromoCodes,
  getPromoCode,
  applyPromoCode
} = require('../controllers/promoCode')
const userAuth = require('../middlewares/userAuth')
const adminAuth = require('../middlewares/adminAuth')

Router.get('/',adminAuth,getPromoCodes)
Router.get('/:id',adminAuth,getPromoCode)
Router.post('/apply',userAuth,applyPromoCode)
Router.post('/create',adminAuth,createPromoCode)
Router.put('/:id/update',adminAuth,updatePromoCode)

module.exports = Router
