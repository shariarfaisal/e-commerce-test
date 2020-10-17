const jwt = require('jsonwebtoken');
const User = require('../models/User')


const userAuth = async (req,res,next) => {
  let token = req.headers['authorization']
  if(!token) return res.status(401).send('Authorization failed.');
  try{
    token = token.replace('Bearer ','')
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    if(!decoded.type || decoded.type !== 'user'){
      return res.status(401).send('Authentication failed.');
    }
    const user = await User.findById(decoded._id).select(' -password ')
    if(!user){
      return res.status(401).send('Authorization failed.');
    }
    req.user = user;
    next();
  }catch(e){
    return res.status(401).send('Authorization failed.');
  }
}

module.exports = userAuth
