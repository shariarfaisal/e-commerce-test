const Router = require('express').Router()
const {
  getOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/order')
const userAuth = require('../middlewares/userAuth')
const adminAuth = require('../middlewares/adminAuth')

Router.get('/user',userAuth,getUserOrders)
Router.get('/',adminAuth,getOrders)
Router.post('/',userAuth,createOrder)
Router.put('/:id/status',adminAuth,updateOrderStatus)
Router.delete('/:id',adminAuth,deleteOrder)

module.exports = Router
