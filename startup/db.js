const mongoose = require('mongoose')

module.exports = () => {
  if(process.env.NODE_ENV === 'production'){
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@faisal-0eqby.mongodb.net/etherpm?retryWrites=true&w=majority`,
      {useNewUrlParser: true},() => {
        console.log('Database connected!');
      }
    );
  }else{
    mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {useNewUrlParser: true},() => {
      console.log('Database connected!');
    });
  }
}
