const Admin = require('../models/Admin')
const { loginValidator, signupValidator } = require('../validators/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const login = async (req,res) => {
  const { username, password } = req.body;
  /* Check errors ... */
  const { error, isValid } = loginValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  // Check Admin Conflict
  const admin = await Admin.findOne({ username })
  if(!admin) return res.status(400).send({ message: 'Invalid credentials!'})

  // Password Validation
  const validatePass = await bcrypt.compare(password,admin.password)
  if(!validatePass) return res.status(400).send({ message: 'Invalid credentials!' })

  // Get response with token
  const accessToken = admin.getToken()
  res.header('Authorization',accessToken).status(200).send({ accessToken })
}


const signup = async (req,res) => {
  const { username, password } = req.body

  /* Checking errors ... */
  const { error, isValid } = signupValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  /* Checking admin existence... */
  const adminExists = await Admin.findOne({ username });
  if(adminExists) return res.status(400).send({ username: "Username taken!"})

  const admin = new Admin({ username, password }) // Create new admin ...
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password,salt); // Hashing password ...
  await admin.save();
  const accessToken = admin.getToken();
  return res.status(201).send({ accessToken });
}

// Get  Admins ...
const getAdmins = async (req,res) => {
  const admins = await Admin.find().select(' -password ')
  return res.status(200).send(admins)
}


// Get Profile Info ...
const getProfile = async (req,res) => {
  const admin = await Admin.findById(req.admin._id)
  if(!admin) return res.status(404).send({ message: 'Not found!'});
  if(admin) return res.status(200).send(admin)
}

module.exports = {
  login,
  signup,
  getAdmins,
  getProfile
}
