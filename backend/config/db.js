const mongoose = require('mongoose')

const db_connection = ()=>{
mongoose.connect('mongodb+srv://ines:RestauAppNode21@cluster0.8eyzr.mongodb.net/chef-d-oeuvre?retryWrites=true&w=majority',  
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  }
  )
  .then(()=> {
    console.log('db_connected');
  })
  .catch(()=>{
    console.log('error db_no_connected');
  })
}
module.exports = db_connection