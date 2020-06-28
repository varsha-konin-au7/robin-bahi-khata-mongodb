const express = require('express')
const router = express.Router()
const controllers = require('../controller/user.controller')
const signup = require('../validation/user.signup.validation')
const {validationResults} = require('../validation/validation')

router.post('/signup', controllers.register)
router.post('/login', controllers.login)
router.get('/profile', controllers.profile)

module.exports = router