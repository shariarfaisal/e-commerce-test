const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const User = require('../routes/user')
const Product = require('../routes/product')
const Order = require('../routes/order')
const Admin = require('../routes/admin')
const PromoCode = require('../routes/promoCode')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(express.static('uploads'))
  app.use('/api/user',User)
  app.use('/api/product',Product)
  app.use('/api/order',Order)
  app.use('/api/admin',Admin)
  app.use('/api/promo',PromoCode)
}
