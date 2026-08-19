let express = require('express')
const { checkUserLogin } = require('../../middleware/checkUserLogin')
const { creatChat ,sendChat ,getChat,getChatMessage, deleteEntireChat} = require('../../controller/web/chatController')
let chatRoutes = express.Router()

chatRoutes.use(checkUserLogin)

chatRoutes.post('/create', creatChat)

chatRoutes.post('/send', sendChat)

chatRoutes.get('/user', getChat)

chatRoutes.get('/user/:chatId', getChatMessage)

chatRoutes.delete('/delete/:chatId', deleteEntireChat)

module.exports = chatRoutes