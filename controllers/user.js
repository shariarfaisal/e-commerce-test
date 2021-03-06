const User = require('../models/User')
const { loginValidator, signupValidator } = require('../validators/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const login = async (req,res) => {
  const { email, password } = req.body;
  /* Check errors ... */
  const { error, isValid } = loginValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  const user = await User.findOne({ email })
  if(!user) return res.status(400).send({ message: 'Invalid credentials!'})

  const validatePass = await bcrypt.compare(password,user.password)
  if(!validatePass) return res.status(400).send({ message: 'Invalid credentials!' })
  const accessToken = user.getToken()
  res.header('Authorization',accessToken).status(200).send({ accessToken })
}


const signup = async (req,res) => {
  const { name, email, password } = req.body

  /* Checking errors ... */
  const { error, isValid } = signupValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  /* Checking emial existence... */
  const emailExists = await User.findOne({ email });
  if(emailExists) return res.status(400).send({ email: "Email taken!"})

  const user = new User({ name, email, password }) // Create new user ...
  const salt = await bcrypt.genSalt(10); //Generate salt to hash password ...
  user.password = await bcrypt.hash(user.password,salt); // Hashing password ...
  await user.save(); // Save user data ...
  res.status(201).send(true);
}

// Get  Users ...
const getUsers = async (req,res) => {
  const users = await User.find().select(' -password ')
  return res.status(200).send(users)
}

// Get User By ID ...
const getUserById = async (req,res) => {
  const user = await User.findById(req.params.id).select(' -password ')
  if(!user) return res.status(404).send({ message: 'Not found!'});
  return res.status(200).send(user)
}


// Get Profile Info ...
const getProfile = async (req,res) => {
  const user = await User.findById(req.user._id)
  if(!user) return res.status(404).send({ message: 'Not found!'});
  if(user) return res.status(200).send(user)
}


// Get Delete Account...
const getDelete = async (req,res) => {
  const user = await User.findByIdAndDelete(req.user._id);
  if(!user) return res.status(404).send({message: 'Not found!'})
  return res.status(200).send(user);
}

module.exports = {
  login,
  signup,
  getUsers,
  getUserById,
  getProfile,
  getDelete
}
