let bcrypt = require('bcrypt')
const { transporter } = require('../../config/mailConfig')
const userModel = require('../../model/userModel')
let saltRound = 10
let OTPDATA = new Map()
let jwt = require("jsonwebtoken")
let crypto = require('crypto')



// user registration worked here
let register = async (req, res) => {

    let inserObj = req.body
    let { role } = req.body
    let emailOTP = OTPDATA.get('MYOTP')
    let myOTP = req.body.code


    if (emailOTP == myOTP) { //OTP-CHECK

        let hashPassword = await bcrypt.hash(req.body.password, 10)
        inserObj['password'] = hashPassword
        inserObj['isVerified'] = true
        inserObj['isApproved'] = role != 'seller' ? true : false

        try {
            let insertUser = new userModel(inserObj)
            let user = await insertUser.save()
            let resObj = {
                status: 1,
                message: 'You Successfully Registerd',
                user
            }
            OTPDATA.delete()
            res.send(resObj)
        }
        catch (error) {
            let resObj = {
                status: 0,
                message: error,
            }
            res.send(resObj)
            console.log(error)
        }

    }
    else {
        let resObj = {
            status: 0,
            message: 'Inavlid OTP',
        }
        res.send(resObj)

    }

}

// email verification worked here
let verification = async (req, res) => {

    try {
        let { email, code } = req.body
        let user = await userModel.findOne({ email })
        if (user) {
            return res.send({
                status: 0,
                message: 'this email id is already exist',
                user
            })
        }

        let verificationCode = Math.floor((Math.random() * 900000)).toString()
        OTPDATA.set('MYOTP', verificationCode)
        let message = `
          <h1  >Your Verification Code Is ${verificationCode}  </h1>
               <p> This Verification Code Enter On Verification Code Page To Verified Your Email  </p>
             `


        // SEND-OTP-
        let info = await transporter.sendMail({
            from: 'mohitrao56722@gmail.com', // sender address
            to: `${email}`, // list of receivers
            subject: `Verify Your Email - Luxury Yard  `, // Subject line
            message: ` <h1><strong></strong></h1> <p> </p> `, // plain text body
            html: message,
        });

        res.send({
            status: 1,
            message: 'OTP Send Your Email ',
            user
        })


    }
    catch (error) {
        res.send({
            status: 1,
            message: error,
            user
        })
    }



    // try {

    //     let { email } = req.body

    //     let user = await userModel.findOne({ email: req.body.email })
    //     if (user) {
    //         let resObj = {
    //             status: 0,
    //             message: 'Email Id Is Already Exist',
    //             error
    //         }
    //         res.send(resObj)
    //     }


    //     let OTP = Math.floor((Math.random() * 900000)).toString()
    //     OTPDATA.set('MYOTP', OTP)

    //     // SEND-OTP-
    //     let info = await transporter.sendMail({
    //         from: 'mohitrao56722@gmail.com', // sender address
    //         to: `${email}`, // list of receivers
    //         subject: "OTP✔", // Subject line
    //         text: "Hello User?", // plain text body
    //         html: `<b> ${OTP} </b>`,
    //     });

    //     let resObj = {
    //         status: 1,
    //         message: 'OTP Send Your Email ',
    //     }
    //     res.send(resObj)


    // }
    // catch (error) {
    //     res.send(error)
    // }
}



// login worked here
let login = async (req, res) => {

    try {
        let { password, email } = req.body
        let user = await userModel.findOne({ email })//CHECK-EMAIL

        if (!user) {
            let resObj = {
                status: 0,
                message: 'Invalid Email ',
            }
            res.send(resObj)
        }
        let isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword) {
            let resObj = {
                status: 0,
                message: 'Invalid Password ',
            }
            res.send(resObj)
        }

        // user blocked
        if (user.isBlocked) {
            let resObj = {
                status: 0,
                message: 'Your Account Has Been Blocked By The Admin Please Contact Support',
            }
            res.send(resObj)
        }

        //   token creation
        let token = jwt.sign({
            user: {
                email: user.email,
                id: user._id,
                role: user.role
            }
        }, process.env.TOKENKEY)

        user.token = token
        await user.save()
        let resObj = {
            status: 1,
            message: 'Successfully Login',
            data: user,
            token
        }
        res.send(resObj)
    }
    catch (error) {
        let resObj = {
            status: 0,
            message: error,
        }
        res.send(resObj)
    }
}



//forgot password worked here
let forGotPassword = async (req, res) => {
    try {
        let { email } = req.body
        let user = await userModel.findOne({ email })

        // check user found 
        if (!user) {
            let resObj = {
                status: 0,
                message: 'User Not Found This Email ',
                data: user
            }
            return res.send(resObj)
        }

        let resetToken = crypto.randomBytes(10).toString('hex')
        let resetPasswordExpire = Date.now() + 10 * 60 * 1000
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        user.resetPasswordExpire = resetPasswordExpire
        user.save()

        let clientUrl = 'http://localhost:3000/'
        let resetUrl = `${clientUrl}pages/auth/resetpassword/${resetToken}`
        let message = `
            <h1  >Paswword Reset Request </h1>
              <p> You Requested A Reset Password. Pleaser Click On The Link Below To Reset Your Password ${resetToken}  </p>
               <Link href=${resetUrl} >  ${resetUrl} </Link>
               <p> This Link Will Be Expire In 10 Minutes  </p>
             `


        try {
            let info = await transporter.sendMail({
                from: 'mohitrao56722@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: `Reset Your Password - Luxury Yard  `, // Subject line
                html: message,
            });

            let obj = {
                status: 1,
                message: 'Password Reset Link Sent To Your Email  ',
                data: user,
            }
            res.send(obj)
        }
        catch (error) {
            let obj = {
                status: 0,
                message: 'Could Not Sent Email'
            }
            res.send(obj)
        }
    }
    catch (error) {
        let obj = {
            status: 0,
            message: error
        }
        res.send(obj)
    }
}



// reset password worked here
let changePassword = async (req, res) => {

    try {
        let { token } = req.params
        let { conFirmPassword, newPassword } = req.body

        let resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
        let user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })


        // user exist 
        if (!user) {
            let resObj = {
                status: 0,
                message: 'Password Reset Link Will Be Expired!'
            }
            return res.send(resObj)
        }



        //check new pasword and re Confirm Password is same
        if (newPassword != conFirmPassword) {
            let resObj = {
                status: 0,
                message: 'Password Is Not Matched '
            }
            return res.send(resObj)
        }
        let hashPassword = await bcrypt.hash(newPassword, 10)



        user.password = hashPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        let resObj = {
            status: 1,
            message: 'Password Reset Successfully '
        }
        res.send(resObj)


    }
    catch (error) {
        let resObj = {
            status: 0,
            message: error
        }
        return res.send(resObj)
        console.log(error)
    }
}





// change Password After Login worked here
let changePasswordAfterLogin = async (req, res) => {

    try {

        let token = req.headers.authorization.split(' ')[1]
        let docode = jwt.verify(token, process.env.TOKENKEY)
        //console.log(req.user)
        let { email } = req.body
        let user = await userModel.findOne({ _id: docode.user.id })
        let id = user._id
        let dbPassword = user.password
        // user exist
        if (!user) {
            let resObj = {
                status: 0,
                message: 'User Not Found'
            }
            return res.send(resObj)
        }

        // password matched not matched
        let passwordMatched = await bcrypt.compare(req.body.oldPassword, dbPassword)
        if (!passwordMatched) {
            let resObj = {
                status: 0,
                message: 'Old Password Is Not Matched'
            }
            return res.send(resObj)
        }

        //check old pasword and new password is not same
        let hashPassword = await bcrypt.hash(req.body.newPassword, 10)
        if (req.body.newPassword == req.body.oldPassword) {
            let resObj = {
                status: 0,
                message: 'Please Creat The New Password '
            }
            return res.send(resObj)
        }


        let userRes = await userModel.updateOne({ _id: id }, { $set: { password: hashPassword } })
        //console.log(userRes)
        let resObj = {
            status: 1,
            message: 'Password Updated Successfully',
            userRes
        }
        res.send(resObj)

    }
    catch (error) {
        let resObj = {
            status: 0,
            message: error
        }
        res.send(resObj)
        console.log(error)
    }
}





module.exports = { register, login, changePassword, verification, forGotPassword, changePasswordAfterLogin }





// try {

//     let token = req.headers.authorization.split(' ')[1]
//     let decode = jwt.verify(token, process.env.TOKENKEY)

//     let id = decode.id
//     console.log(decode)
//     let checkId = await userModel.findOne({ _id: id }) //ID CHECK
//     if (checkId) {
//         let dbPassword = checkId.password
//         let checkPasword = bcrypt.compareSync(req.body.oldPassword, dbPassword)
//         //PASSWORD CHECK
//         if (checkPasword) {
//             //  update password

//             let salt = bcrypt.genSaltSync(saltRound)
//             let password = bcrypt.hashSync(req.body.newPassword, salt)
//             let userRes = await userModel.updateOne({ _id: id }, { $set: { password } })
//             let obj = {
//                 status: 1,
//                 message: 'Password Changed Successfully',
//                 userRes
//             }
//             res.send(obj)

//         }
//         else {
//             let obj = {
//                 status: 0,
//                 message: 'Invalid Odl Password',
//             }
//             res.send(obj)
//         }

//     }

// }
// catch (error) {
//     let obj = {
//         status: 0,
//         message: error,
//     }
//     res.send(obj)
// }