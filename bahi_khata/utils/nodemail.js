const nodeMailer = require('nodemailer')

const sendEmail = async options => {

let transport = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user:"bahikhata09@gmail.com",
        pass:"Bahi_Khata@123"
    }
})

let mailOptions = {
    from:'"Bahi_Khata Team" <bahikhata09@gmail.com>',
    to: "konin.varsha@gmail.com",
    subject:"Welcome to Our Family",
    text:`Thank You for signing up with us. We ensure to give you best service from our end.
    
Regards,
Bahi Khata Team`,

    html: options.mailOptions

}

const info = await transport.sendMail(mailOptions);

console.log("Mail sent to: " , options.email)

}

module.exports = sendEmail