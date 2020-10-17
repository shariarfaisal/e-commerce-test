const Router = require('express').Router()
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct
} = require('../controllers/product')
const userAuth = require('../middlewares/userAuth')
const adminAuth = require('../middlewares/userAuth')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null,'uploads/')
  },
  filename: function(req,file,cb){
    cb(null,`${Date.now()}_${file.originalname}`);
  }
})

const fileFilter = (req,file,cb) => {
  console.log(file);
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ){
    cb(null,true);
  }else{
    req.fileError = "Only jpeg, jpg and png file sufforted!"
    cb(null,false);
  }
}


const upload = multer({storage: storage,limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
})


Router.get('/',getProducts)
Router.get('/:id',getProduct)
Router.post('/',upload.single('image'),createProduct)
Router.delete('/:id',adminAuth,deleteProduct)

module.exports = Router
