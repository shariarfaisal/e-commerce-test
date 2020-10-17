const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin')

const adminAuth = async (req,res,next) => {
  let token = req.headers['authorization']
  if(!token) return res.status(401).send('Authentication failed.');
  try{
    token = token.replace('Bearer ','')
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    if(!decoded.type || decoded.type !== 'admin'){
      return res.status(401).send('Authentication failed.');
    }
    const admin = await Admin.findById(decoded._id).select(' -password ')
    if(!admin){
      return res.status(401).send('Authentication failed.');
    }
    req.admin = admin;
    next();
  }catch(e){
    return res.status(401).send('Authentication failed.');
  }
}

module.exports = adminAuth
