// Requiring the modules

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 8080;
const customerRouter = require('./routes/customers');
const userRouter = require('./routes/user')
const database = require('./config/database.connection')


// load the env variables 
dotenv.config(
    {
        path : "./config/config.env"
    }
)

// Instantiate express module
const app = express();

//  Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


// mounting the route to a default path
app.use('/api/v1/users', userRouter);
app.use('/api/customer',customerRouter);

//setting up the server port for listening
app.listen(PORT,() => {
    console.log(`Server connected to ${PORT}`)
})
