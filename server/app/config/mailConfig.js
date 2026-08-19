let nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: "mohitrao56722@gmail.com",
        pass: "muydthhfioeidqwm",
    },
});

// let sendEmail = async (options) => {



//     let data = {
//         sender: {
//             name: 'Luxury Yard Real Estate',
//             email: process.env.EMAIL_OWN
//         },
//         to: [{ email: options.email }],
//         subject: options.subject,
//         htmlContent: options.message
//     }
// }


module.exports = { transporter }
