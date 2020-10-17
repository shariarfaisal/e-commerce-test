const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/db')()
require('dotenv').config()

const PORT = process.env.PORT || 4000
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
})
