let jwt = require("jsonwebtoken")

let checkUserLogin = (req, res, next) => {

    let token = req.headers.authorization.split(' ')[1]
    let decode = jwt.verify(token, process.env.TOKENKEY)
    req.user = decode.user

    if (req.user) {
        next()
    }
    else {
        let obj = {
            status: 0,
            message: 'Inavalid Token'
        }
        res.send(obj)
    }


}

module.exports = { checkUserLogin }