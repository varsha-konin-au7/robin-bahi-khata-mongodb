const express = require('express')
const router = express.Router()
const {controller} = require('../controller/customer.controller')

router.post('/addcustomer',controller.create)               
router.get('/findone/:Phone_Number' , controller.findACustomer)
router.get('/find' , controller.findCustomer)  
router.put('/updateInfo/:_id' , controller.updateCustomer)     
router.delete('/deleteInfo/:_id' , controller.deleteCustomer)

module.exports = router