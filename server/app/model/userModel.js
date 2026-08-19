let mongoose = require('mongoose')

let userSchema = mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ['buyer', 'seller', 'admin'],
            default: 'buyer'
        },
        password: {
            type: String,
            required: true
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        profilePic: {
            type: String,
            required: false
        },
        isApproved: {
            type: String,
            default: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpire: {
            type: Date,
        },
    }, {
    timestamps: true
}
)

let userModel = mongoose.model('user', userSchema)
module.exports = userModel







// let veriFiedEmail = async (req, res) => {

//     try {
//         let { email, code } = req.body
//         let user = await userModel.findOne({ email })

//         // check user exist or not
//         if (!user) {
//             let resObj = {
//                 status: 0,
//                 message: 'user not found ',
//             }
//         }

//         // check user exist or not
//         if (user.isVerified) {
//             let resObj = {
//                 status: 0,
//                 message: 'Email Is Already Verified ',
//             }
//             res.send(resObj)
//         }

//         // check user exist or not
//         if (user.verificationCode !== code) {
//             let resObj = {
//                 status: 0,
//                 message: 'Invalid Verification Code ',
//             }
//             res.send(resObj)
//         }

//         user.verificationCode = undefined
//         user.isVerified = true
//         await user.save()
//         res.send({
//             status: 1,
//             message: 'Email Verified Successfully ',
//         })

//     }




//     catch (error) {
//         let resObj = {
//             status: 0,
//             message: error,
//         }
//         res.send(resObj)
//     }
// }




// let checkUserLogin = async (req, res, next) => {

//     try {
//         let token = req.headers.authorization.split(' ')[1]
//         let decode = jwt.verify(token, process.env.TOKENKEY)

//         if (!token) {
//             let obj = {
//                 status: 0,
//                 message: 'Token Is Missing'
//             }
//             res.send(obj)
//         }

//         req.user = await userModel.findById(decode.id).select('-passowrd')

//         if (req.user && user.isBlocked) {
//             let obj = {
//                 status: 0,
//                 message: 'Your Accout Has Been Blocked By The Admin'
//             }
//             res.send(obj)
//         }
//         next()
//     }
//     catch (error) {
//         let obj = {
//             status: 0,
//             message: error
//         }
//         res.send(obj)
//     }

// }





// let resetToken = crypto.randomBytes(10).toString()
// let resetPasswordExpire = Date.now() + 10 * 60 * 1000
// user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
// user.resetPasswordExpire = resetPasswordExpire
// await user.save()


// let clientUrl = 'http://localhost:3000/'
// let resetUrl = `${clientUrl}pages/auth/resetpassword/${resetToken}`
// let message = `
//              <h1> Paswword Reset Request</h1>
//              <p> You Requested A Reset Password. Pleaser Click On The Link Below To Reset Your Password ${resetToken}  </p>
//                <Link href=${reseturl} >  ${reseturl} </Link>
//                <p> This Link Will Be Expire In 10 Minutes  </p>
//              `
