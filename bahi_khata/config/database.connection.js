// Import the necessary module 
const mongoose = require('mongoose');

//mongo atlas connection configaration settings
 database = mongoose.connect("mongodb+srv://bahiKhata:12345@cluster0-lnmkb.mongodb.net/expenses?retryWrites=true&w=majority" 
,(
    {
        useUnifiedTopology:true,
        useNewUrlParser:true
    }
    )
)
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log("Error in connecting Db and err is " + err))

module.exports = database;