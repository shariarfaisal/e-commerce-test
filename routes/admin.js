const Router = require('express').Router()
const {
  login,
  signup,
  getAdmins,
  getProfile
} = require('../controllers/admin')
const adminAuth = require('../middlewares/adminAuth')


Router.get('/',adminAuth,getAdmins)
Router.get('/profile',adminAuth,getProfile)
Router.post('/signin',login)
Router.post('/signup',signup)


module.exports = Router 
