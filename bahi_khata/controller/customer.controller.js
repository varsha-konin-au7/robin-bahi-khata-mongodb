// Importing necessary 

const customerSchema = require('../models/user')


const controller = {

    // Add new customer 

    create : (req,res)=>{
        let eachCustomer = new customerSchema({
            Name:req.body.Name,
            Phone_Number:req.body.Phone_Number,
            Debit:req.body.Debit,
            Credit:req.body.Credit,
            Description:req.body.Description,
            Payment_Status:req.body.Payment_Status
        })
        eachCustomer.save((err,data)=>{
            if(err){
                res.json({
                    message:"Error in creating customer!!!",
                    errors:err
                })
            }else{
                res.json({
                    message:"Customer created",
                    data:data
                })
            }
        })
    },
    findACustomer : (req,res)=>{
      let unique_key = { "Phone_Number":req.params.Phone_Number }
      customerSchema.findOne(unique_key,(err,data)=>{
          if(err){
              res.json({
                  message:"Couldn't find the customer",
                  errors:err
              })
          }
          else{
              res.json({
                  message:"Found the Customer",
                  data:data
              })
          }
      })
    },

    findCustomer : (req,res)=>{
    customerSchema.find((err,data)=>{
        if(err){
            res.json({
                message:"Couldn't find customer",
                errors:err
            })
        }
        else{
            res.json({
                message:`Found all Customer`,
                data:data
            })
        }
    })
    },
    updateCustomer : (req,res)=>{
    let query = {_id:req.params._id}
    let update_query = {
        Name:req.body.Name,
        Phone_Number:req.body.Phone_Number,
        Debit:req.body.Debit,
        Credit:req.body.Credit,
        Description:req.body.Description,
        Payment_Status:req.body.Payment_Status
    }
    customerSchema.updateOne(query,update_query,(err,data)=>{
        if(err){
            res.json({
                message:"Cannot update customer info",
                error:err
            })
        }
        res.json({
            message:"Customer info updated",
            data:data
        })
    })  
    },
    deleteCustomer : (req,res)=>{
    let delete_query = {_id:req.params._id}
    customerSchema.deleteOne(delete_query,(err,data)=>{
        if(err){
            res.json({
                message:"Error in deleting customer",
                error:err
            })
        }
        res.json({
            message:"Customer deleted"
        })
    })
    }
}    



module.exports = {controller}