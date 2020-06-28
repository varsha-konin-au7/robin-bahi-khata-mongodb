// Requiring necessary modules

const mongoose = require('mongoose');
const Schema = mongoose.Schema

//  Create Schema

let customerSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,

    Name:{
        type:String,
        required:true,
        minlength:2
    },

    Phone_Number:{
        type:Number,
        required:true,
        unique:true,
        maxlength:10
    },

    Debit:{
        type:Number,
        required:false,
    },

    Credit:{
        type:Number,
        required:false,
    },

    Description:{
        type:String,
        required:true
    },

    Payment_Status:{
        type:String,
        enum:["Not Paid","Partially Paid","Paid"],
        default:"Not Paid"
    },

    Date_Of_Transaction:{
        type:Date,
        default:Date.now()
        
    },
    signup: {
        type: Schema.Types.ObjectId,
        ref: "signup"
      }

    
},
{
    timestamps : false
});


    
customerSchema = mongoose.model('Detail',customerSchema);


module.exports = customerSchema;